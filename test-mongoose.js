
const mongoose = require('mongoose');
const Session = require('./src/models/Session');

async function test() {
    const session = new Session({
        userId: new mongoose.Types.ObjectId(),
        topic: 'Test',
        level: 'Beginner',
        questions: [{ questionText: 'Q1', correctAnswer: 'A1' }]
    });
    console.log('Q ID:', session.questions[0]._id);
    const q = session.questions.id(session.questions[0]._id);
    console.log('Found Q:', q ? q.questionText : 'Not found');
    process.exit(0);
}
test();
