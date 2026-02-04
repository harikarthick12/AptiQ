require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./src/config/db');

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
