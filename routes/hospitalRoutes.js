const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

// Middleware to check authentication
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

// INDEX
router.get('/hospitals', isLoggedIn, async (req, res) => {
    const hospitals = await Hospital.find({});
    res.render('hospitals/index', { hospitals });
});

// NEW
router.get('/hospitals/new', isLoggedIn, (req, res) => {
    res.render('hospitals/new');
});
router.post('/hospitals', isLoggedIn, async (req, res) => {
    const hospital = new Hospital(req.body.hospital);
    await hospital.save();
    res.redirect('/hospitals');
});

// SHOW
router.get('/hospitals/:id', isLoggedIn, async (req, res) => {
    const hospital = await Hospital.findById(req.params.id);
    res.render('hospitals/show', { hospital });
});

// EDIT
router.get('/hospitals/:id/edit', isLoggedIn, async (req, res) => {
    const hospital = await Hospital.findById(req.params.id);
    res.render('hospitals/edit', { hospital });
});
router.post('/hospitals/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { location, numberOfDoctors, numberOfBed } = req.body.hospital;
    await Hospital.findByIdAndUpdate(id, { location, numberOfDoctors, numberOfBed });
    res.redirect(`/hospitals/${id}`);
});

// DELETE
router.post('/hospitals/:id/delete', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Hospital.findByIdAndDelete(id);
    res.redirect('/hospitals');
});

module.exports = router;
