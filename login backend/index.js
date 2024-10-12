// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://mern-2.s3-website-us-east-1.amazonaws.com/', // Replace with your frontend URL
  credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Login', {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
