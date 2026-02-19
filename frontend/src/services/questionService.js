
import questionBank from '../data/questionBank';

class QuestionService {
    /**
     * Gets content for a session, picking questions the user HAS NOT seen yet.
     */
    async getSessionContent(topic, currentLevel, seenIds = [], correctIds = []) {
        const topicData = questionBank[topic] || questionBank['Number System'];

        // Determine Level based on correct answers
        // Level 1: Beginner (0-9 correct)
        // Level 2: Intermediate (10-19 correct)
        // Level 3: Advanced (20+ correct)
        const correctCount = correctIds.length;
        let difficulty = 'Beginner';
        if (correctCount >= 20) difficulty = 'Advanced';
        else if (correctCount >= 10) difficulty = 'Intermediate';

        // 1. Filter by difficulty
        let levelQuestions = topicData.questions.filter(q => q.difficulty === difficulty);

        // 2. Filter out seen questions within this difficulty
        let availableQuestions = levelQuestions.filter(q => !seenIds.includes(q.id));

        // If we ran out of questions in this difficulty, or if the bank is small, 
        // fallback to any unseen questions in this topic
        if (availableQuestions.length < 5) {
            availableQuestions = topicData.questions.filter(q => !seenIds.includes(q.id));
        }

        // If STILL no questions (bank exhausted), reset and allow all
        if (availableQuestions.length === 0) {
            availableQuestions = topicData.questions;
        }

        // Shuffle available questions
        const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());

        // Pick 10 questions
        const batchSize = 10;
        const selected = shuffled.slice(0, batchSize);

        // Add a temporary MongoDB-like _id for frontend compatibility
        const formattedQuestions = selected.map(q => ({
            ...q,
            _id: q.id
        }));

        return {
            explanation: topicData.explanation,
            explanation_tamil: topicData.explanation_tamil,
            explanation_telugu: topicData.explanation_telugu,
            workedExample: topicData.workedExample,
            questions: formattedQuestions,
            level: difficulty, // Return the actual level used
            tip: `Welcome to ${difficulty} level!`
        };
    }
}

export default new QuestionService();
