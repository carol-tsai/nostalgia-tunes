const router = require('express').Router();
const { User, Playlist, Song} = require('../models');
const { route } = require('./user-routes');

router.get('/',  (req,res) => {
    res.render('homepage')
});

router.get('/login', (req,res) => {
    res.render('login')
})

module.exports = router;