const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Kullanıcı CRUD İşlemleri
// Kullanıcı oluşturma (POST)
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Tüm kullanıcıları okuma (GET)
router.get('/', async (req, res) => {
    try {
        const user = await User.find(); // Tüm kullanıcıları bul
        res.status(200).send(user); // Kullanıcıları döndür
    } catch (error) {
        res.status(500).send(error); // Hata durumunda yanıt gönder
    }
});
// Belirli bir kullanıcıyı okuma (GET)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // ID ile kullanıcıyı bul
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Belirli bir kullanıcıyı güncelleme (PUT)
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Kullanıcıyı bul ve güncelle
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı'); // Kullanıcı yoksa hata yanıtı
        }
        res.status(200).send(user); // Güncellenmiş kullanıcıyı döndür
    } catch (error) {
        res.status(400).send(error); // Hata durumunda yanıt gönder
    }
});
// Belirli bir kullanıcı silme (DELETE):
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Kullanıcıyı bul ve sil
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı'); // Kullanıcı yoksa hata yanıtı
        }
        res.status(200).send({ message: 'Kullanıcı silindi' }); // Başarılı yanıt
    } catch (error) {
        res.status(500).send(error); // Hata durumunda yanıt gönder
    }
});

module.exports = router;