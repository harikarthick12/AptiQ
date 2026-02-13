
const questionBank = require('../data/questionBank');

class QuestionService {
    /**
     * Gets content for a session, picking questions the user HAS NOT seen yet.
     */
    async getSessionContent(topic, level, user = null) {
        const topicData = questionBank[topic] || questionBank['Percentages'];
        const language = user ? user.preferredLanguage : 'English';

        // 1. Get base explanation and example
        let explanation = topicData.explanation;
        if (language === 'Tamil' && topicData.explanation_tamil) explanation = topicData.explanation_tamil;
        if (language === 'Telugu' && topicData.explanation_telugu) explanation = topicData.explanation_telugu;

        // 2. Pick questions
        // Determine which questions this user has already seen
        const seenIds = (user && user.progress && user.progress.get(topic))
            ? user.progress.get(topic).seenQuestionIds || []
            : [];

        // Filter out seen questions
        let availableQuestions = topicData.questions.filter(q => !seenIds.includes(q.id));

        // If we ran out of questions, reset the seen list for this topic to allow a fresh start
        if (availableQuestions.length === 0) {
            availableQuestions = topicData.questions;
            if (user && user.progress && user.progress.has(topic)) {
                const prog = user.progress.get(topic);
                prog.seenQuestionIds = [];
                user.progress.set(topic, prog);
                // Note: user.save() should be called by the controller
            }
        }

        // Shuffle available questions to avoid repetitive feeling
        const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());

        // Pick 3 questions
        const batchSize = 3;
        const selected = shuffled.slice(0, batchSize);

        return {
            explanation,
            workedExample: topicData.workedExample,
            questions: selected,
            tip: topicData.tip || "Practice makes perfect!"
        };
    }
}

module.exports = new QuestionService();
