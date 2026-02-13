
const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
    console.log('URI:', process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('CONNECTED');
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err.message);
        process.exit(1);
    }
}
test();
