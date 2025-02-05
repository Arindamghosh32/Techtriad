const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Hackathon';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connected successfully");
    if (process.env.NODE_ENV === 'development') {
        console.log('Connected to local MongoDB');
    } else {
        console.log('Connected to MongoDB Atlas');
    }
})
.catch((err) => {
    console.error("Database connection error:", err);
});

module.exports = mongoose.connection;
