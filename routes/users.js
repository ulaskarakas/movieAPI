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
        res.status(400).json({ message: error.message });
    }
});
// Login user (POST)
router.post('/login', async(req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user || user.password !== password) {
            return res.status(401).send('Email or password is incorrect.');
        }
        if(user.admin === true){
            res.status(200).redirect('/admin');
        }
        else {
            res.status(200).redirect('/user');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error.')
    }
});
// Read all users (GET)
router.get('/', async (req, res) => {
    try {
        const user = await User.find(); 
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Read a specific user with id (GET)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Update a specific user with id (PUT)
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Delete a specific user with id (DELETE):
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı');
        }
        res.status(200).send({ message: 'Kullanıcı silindi' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;