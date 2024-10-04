const express = require('express');
const app = express();
const db = require('./helper/db.js');

// Body Parser
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`);
});
