const OpenAI = require('openai');

class AIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateSessionContent(topic, level, previousContext = null) {
        // Construct the prompt based on the context (new session or follow-up)
        const prompt = this._buildPrompt(topic, level, previousContext);

        try {
            const completion = await this.openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are an expert aptitude tutor. You must respond in a valid JSON format." },
                    { role: "user", content: prompt }
                ],
                model: "gpt-3.5-turbo", // Or gpt-4 if available/affordable
                response_format: { type: "json_object" },
            });

            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error("AI Generation Error:", error);
            throw new Error("Failed to generate content from AI");
        }
    }

    _buildPrompt(topic, level, context) {
        let basePrompt = `
      You are an expert aptitude tutor.
      Topic: ${topic}
      Difficulty: ${level}
    `;

        if (context) {
            basePrompt += `
        User last answer: ${context.userAnswer}
        Correct answer: ${context.correctAnswer}
        Previous Question: ${context.previousQuestion}
      `;
        }

        basePrompt += `
      Tasks:
      1. Explain the concept in simple words (if this is a new sub-topic or explanation).
      2. If the user made a mistake in the previous question, explain the mistake clearly and show the correct logic step-by-step.
      3. Give one worked example.
      4. Generate 3 practice questions.
      5. End with one shortcut or tip.

      Strictly output valid JSON with this structure:
      {
        "explanation": "string (concept explanation or mistake analysis)",
        "workedExample": {
          "problem": "string",
          "solution": "string"
        },
        "questions": [
          {
            "questionText": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": "string (must match one option)",
            "explanation": "string",
            "difficulty": "${level}"
          }
        ],
        "tip": "string"
      }

      Use very simple language. No unnecessary theory. Be practical and clear.
    `;

        return basePrompt;
    }
}

module.exports = new AIService();
