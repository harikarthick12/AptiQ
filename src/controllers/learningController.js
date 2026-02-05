const Session = require('../models/Session');
const User = require('../models/User');
// Using mock AI service to avoid OpenAI rate limits
const aiService = require('../services/mockAIService');

exports.startSession = async (req, res) => {
    try {
        const { topic, level } = req.body;
        const userId = req.user.id; // Assume middleware adds user to req

        // Generative AI content
        const aiContent = await aiService.generateSessionContent(topic, level, null, req.user.preferredLanguage);

        const newSession = await Session.create({
            userId,
            topic,
            level,
            explanation: aiContent.explanation,
            workedExample: aiContent.workedExample,
            questions: aiContent.questions,
            score: 0,
            mistakes: []
        });

        res.status(200).json({
            status: 'success',
            data: {
                session: newSession
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const { sessionId, questionId, answer } = req.body;

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const question = session.questions.id(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Evaluate
        // Simple string matching for now, maybe need smarter check later
        const isCorrect = question.correctAnswer.toLowerCase().trim() === answer.toLowerCase().trim();

        question.userAnswer = answer;
        question.isCorrect = isCorrect;

        await session.save();

        res.status(200).json({
            status: 'success',
            data: {
                isCorrect,
                correctAnswer: question.correctAnswer,
                explanation: (req.user.preferredLanguage === 'Tamil' && question.explanation_tamil) ? question.explanation_tamil :
                    (req.user.preferredLanguage === 'Telugu' && question.explanation_telugu) ? question.explanation_telugu :
                        question.explanation
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.analyzeAndContinue = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await Session.findById(sessionId); // .populate('userId');

        // Logic for adaptation
        // Count correct answers
        const titleQuestions = session.questions.length;
        const correctCount = session.questions.filter(q => q.isCorrect).length;
        const wrongCount = titleQuestions - correctCount;

        // Determine next step
        let nextLevel = session.level;
        let context = null;

        if (correctCount === titleQuestions) {
            // 3 correct (assuming 3 qs) -> next level
            if (session.level === 'Beginner') nextLevel = 'Intermediate';
            else if (session.level === 'Intermediate') nextLevel = 'Advanced';
        } else if (wrongCount >= 2) {
            // 2 wrong -> go back (or stay)
            if (session.level === 'Advanced') nextLevel = 'Intermediate';
            else if (session.level === 'Intermediate') nextLevel = 'Beginner';
            // If already beginner, provide more basics
        }

        // If wrong, we might want to pass the last wrong question context to AI
        if (wrongCount > 0) {
            const lastWrong = session.questions.find(q => !q.isCorrect && q.userAnswer);
            if (lastWrong) {
                context = {
                    userAnswer: lastWrong.userAnswer,
                    correctAnswer: lastWrong.correctAnswer,
                    previousQuestion: lastWrong.questionText
                };
            }
        }

        // Generate new part
        const aiContent = await aiService.generateSessionContent(session.topic, nextLevel, context, req.user.preferredLanguage);

        // Update session or create new one? 
        // Let's append to current session or update it for simplicity of tracking "Concept Loop"
        // But user model updates might be better. 
        // For now, let's return the new content and update the session's level/content.

        session.level = nextLevel;
        session.explanation = aiContent.explanation; // New explanation
        session.workedExample = aiContent.workedExample;
        session.questions = aiContent.questions; // New set of questions
        // Reset steps for UI
        session.currentStep = 'explanation';

        await session.save();

        res.status(200).json({
            status: 'success',
            data: {
                level: session.level,
                session: session // Return the full session with generated _ids
            }
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}
