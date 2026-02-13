
import questionBank from '../data/questionBank';

class QuestionService {
    /**
     * Gets content for a session, picking questions the user HAS NOT seen yet.
     */
    async getSessionContent(topic, level, seenIds = []) {
        const topicData = questionBank[topic] || questionBank['Percentages'];

        // 1. Get base explanation and example
        let explanation = topicData.explanation;
        // In frontend, we'll handle language selection elsewhere or pass it in

        // 2. Filter out seen questions
        let availableQuestions = topicData.questions.filter(q => !seenIds.includes(q.id));

        // If we ran out of questions, reset
        if (availableQuestions.length === 0) {
            availableQuestions = topicData.questions;
        }

        // Shuffle available questions
        const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());

        // Pick 3 questions
        const batchSize = 3;
        const selected = shuffled.slice(0, batchSize);

        // Add a temporary MongoDB-like _id for frontend compatibility
        const formattedQuestions = selected.map(q => ({
            ...q,
            _id: q.id // Use the bank ID as the unique ID
        }));

        return {
            explanation: topicData.explanation,
            explanation_tamil: topicData.explanation_tamil,
            explanation_telugu: topicData.explanation_telugu,
            workedExample: topicData.workedExample,
            questions: formattedQuestions,
            tip: "Practice makes perfect!"
        };
    }
}

export default new QuestionService();
