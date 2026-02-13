
const OpenAI = require('openai');
require('dotenv').config();

async function test() {
    console.log('Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello" }],
            max_tokens: 5
        });
        console.log('SUCCESS:', response.choices[0].message.content);
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err.message);
        process.exit(1);
    }
}
test();
