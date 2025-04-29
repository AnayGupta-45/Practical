const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// REGISTER
router.get('/register', (req, res) => {
    res.render('auth/register');
});
router.post('/register', async (req, res) => {
    try {
        const { username, password, name, isPatient, age, address } = req.body;
        const user = new User({ username, name, isPatient, age, address });
        await User.register(user, password);
        res.redirect('/login');
    } catch (e) {
        res.send('Error registering user');
    }
});

// LOGIN
router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/hospitals'
}));

// LOGOUT
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
