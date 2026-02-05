const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    },
    questions: [{
        questionText: String,
        options: [String],
        correctAnswer: String,
        explanation: String,
        explanation_tamil: String,
        explanation_telugu: String,
        userAnswer: String,
        isCorrect: Boolean,
        difficulty: String
    }],
    currentStep: {
        type: String,
        enum: ['explanation', 'example', 'practice'],
        default: 'explanation'
    },
    explanation: String,
    workedExample: {
        problem: String,
        solution: String
    },
    score: {
        type: Number,
        default: 0,
    },
    mistakes: [String],
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
