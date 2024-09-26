const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// Body parser'ı kullanarak gelen JSON verilerini okuyabilmek için
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/movierestapi', {
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
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

// Sunucunun çalıştırılması
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
