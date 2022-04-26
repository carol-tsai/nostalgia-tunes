const router = require('express').Router();
const { User, Playlist, Song} = require('../models');
const { route } = require('./user-routes');

router.get('/', async (req,res) => {
    res.render('homepage')
});

router.get('/', async (req,res))

