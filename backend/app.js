const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const learningRoutes = require('./src/routes/learningRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/learn', learningRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('AptiQ Backend is Running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const errorLog = `[${new Date().toISOString()}] ${err.stack}\n`;
    fs.appendFileSync(path.join(__dirname, 'error.log'), errorLog);

    console.error(err.stack); // Still log to console

    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
