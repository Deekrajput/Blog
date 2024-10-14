// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
// const logRoutes=require('./routes/log');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors(
  // origin: 'http://mern-2.s3-website-us-east-1.amazonaws.com/', // Replace with your frontend URL
  // credentials: true,
  // { origin:'https://blog-1lq5.vercel.app/login'}
));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
// app.use('/api/logs', logRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
