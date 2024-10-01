const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true,
        min: 1900,
        max: 2250
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    star: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
        max: 300
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: { 
        type: Date, 
        default: Date.now, // Kullanıcı oluşturulduğunda tarih otomatik olarak atanır
    }
});

module.exports = mongoose.model('Movie', movieSchema);
