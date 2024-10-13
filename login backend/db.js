// db.js
const mongoose = require('mongoose');
const URL="mongodb://localhost:27017/Login"
const connectToMongo = async () => {
    try {
        await mongoose.connect(URL, {
            
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
