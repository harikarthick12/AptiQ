const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('CRITICAL: MONGODB_URI is not defined in environment variables!');
        return;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // Don't exit immediately in production, let Render try to restart
        if (process.env.NODE_ENV !== 'production') process.exit(1);
    }
};

module.exports = connectDB;
