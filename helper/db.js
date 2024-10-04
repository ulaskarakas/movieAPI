const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

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