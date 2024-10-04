const express = require('express');
const router = express.Router();
const User = require('../models/user');

// User CRUD Operations
// Create user (POST)
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
        res.status(500).json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }
});
// Read all users (GET)
router.get('/', async (req, res) => {
    try {
        const user = await User.find(); 
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }
});
// Read a specific user with id (GET)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message:'Kullanıcı bulunamadı' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }
});
// Update a specific user with id (PUT)
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message:'Kullanıcı bulunamadı' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.'});
    }
});
// Delete a specific user with id (DELETE):
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message:'Kullanıcı bulunamadı' });
        }
        res.status(200).json({ message: 'Kullanıcı silindi' });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }
});

module.exports = router;