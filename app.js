const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');

const app = express();

// View engine - EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Public folder for static files
app.use(express.static('public'));

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

// Main page with EJS
app.get('/', (req, res) => {
    res.render('mainpage')
})

// Sign up page with EJS
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Login page with EJS
app.get('/login', (req, res) => {
    res.render('login');
});

// Admin page after login
app.get('/admin', (req, res) => {
    res.render('admin');
});

// User page after login
app.get('/user', (req, res) => {
    res.render('user');
});

// Add Movie page after login
app.get('/addmovie', (req, res) => {
    res.render('addmovie');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});
