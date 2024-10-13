const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const URL = "mongodb+srv://deekrajput94:<WVXm9fGXjhJLi6Ww>@cluster0.zu9qg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas', error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
