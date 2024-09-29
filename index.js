const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const app = express();
// Body parser'ı kullanarak gelen JSON verilerini okuyabilmek için
app.use(bodyParser.json());

// MongoDB Atlas URI
const uri = process.env.MONGODB_ATLAS_URI;

// MongoDB bağlantısı
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', () => {
    console.log('MongoDB bağlantısı başarılı');
});

// Rotaları dahil etme
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

// Rotaları kullanma
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Sunucunun çalıştırılması
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
