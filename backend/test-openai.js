require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
    try {
        console.log('Testing OpenAI API key...');
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Say 'API key is working!'" }],
            model: "gpt-3.5-turbo",
            max_tokens: 20,
        });
        console.log('✅ Success:', completion.choices[0].message.content);
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.status === 401) {
            console.error('The API key is invalid or expired.');
        }
    }
}

testOpenAI();
