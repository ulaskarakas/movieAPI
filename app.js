const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Atlas URI
const uri = process.env.MONGODB_ATLAS_URI;

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connection successful');
});

// Include routes
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});
