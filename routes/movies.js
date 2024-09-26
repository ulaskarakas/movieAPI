const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Film CRUD İşlemleri
// Film oluşturma (POST)
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        description: req.body.description,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        director: req.body.director,
        writer: req.body.writer,
        star: req.body.star,
        duration: req.body.duration,
        rating: req.body.rating
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});
// Tüm filmleri okuma (GET)
router.get('/', async (req, res) => {
    try {
        const movie = await Movie.find(); // Tüm filmleri bul
        res.status(200).send(movie); // Filmleri döndür
    } catch (error) {
        res.status(500).send(error); // Hata durumunda yanıt
    }
});
// Belirli bir filmi okuma (GET)
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // ID ile filmi bul
        if (!movie) {
            return res.status(404).send('Film bulunamadı');
        }
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Belirli bir filmi güncelleme (PUT)
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Filmi güncelle
        if (!movie) {
            return res.status(404).send('Film bulunamadı');
        }
        res.status(200).send(movie); // Güncellenmiş filmi döndür
    } catch (error) {
        res.status(400).send(error);
    }
});
// Belirli bir filmi silme (DELETE):
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id); // ID ile filmi sil
        if (!movie) {
            return res.status(404).send('Film bulunamadı');
        }
        res.status(200).send({ message: 'Film silindi' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;