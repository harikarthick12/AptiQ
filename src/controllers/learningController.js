
const Session = require('../models/Session');
const User = require('../models/User');
const questionService = require('../services/questionService');

exports.startSession = async (req, res) => {
    try {
        const { topic, level } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        const content = await questionService.getSessionContent(topic, level, user);

        const newSession = await Session.create({
            userId,
            topic,
            level,
            explanation: content.explanation,
            workedExample: content.workedExample,
            questions: content.questions,
            score: 0,
            mistakes: []
        });

        // Update user seen questions
        const topicProgress = (user.progress && user.progress.has(topic))
            ? user.progress.get(topic)
            : { level: 'Beginner', seenQuestionIds: [] };

        if (!topicProgress.seenQuestionIds) topicProgress.seenQuestionIds = [];

        content.questions.forEach(q => {
            if (!topicProgress.seenQuestionIds.includes(q.id)) {
                topicProgress.seenQuestionIds.push(q.id);
            }
        });
        user.progress.set(topic, topicProgress);
        user.markModified('progress');
        await user.save();

        res.status(200).json({
            status: 'success',
            data: { session: newSession }
        });
    } catch (err) {
        console.error("DEBUG START SESSION ERROR:", err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const { sessionId, questionId, answer } = req.body;
        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        const question = session.questions.id(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

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
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.analyzeAndContinue = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await Session.findById(sessionId);
        const user = await User.findById(session.userId);

        const correctCount = session.questions.filter(q => q.isCorrect).length;
        const total = session.questions.length;

        let nextLevel = session.level;
        if (correctCount === total) {
            if (session.level === 'Beginner') nextLevel = 'Intermediate';
            else if (session.level === 'Intermediate') nextLevel = 'Advanced';
        }

        const content = await questionService.getSessionContent(session.topic, nextLevel, user);

        session.level = nextLevel;
        session.questions = content.questions;
        session.explanation = content.explanation;
        session.workedExample = content.workedExample;
        session.currentStep = 'practice';

        await session.save();

        // Update user seen questions
        const topicProgress = (user.progress && user.progress.has(session.topic))
            ? user.progress.get(session.topic)
            : { level: nextLevel, seenQuestionIds: [] };

        topicProgress.level = nextLevel;
        if (!topicProgress.seenQuestionIds) topicProgress.seenQuestionIds = [];

        content.questions.forEach(q => {
            if (!topicProgress.seenQuestionIds.includes(q.id)) {
                topicProgress.seenQuestionIds.push(q.id);
            }
        });

        user.progress.set(session.topic, topicProgress);
        user.markModified('progress');
        await user.save();

        res.status(200).json({
            status: 'success',
            data: { level: session.level, session: session }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
}
