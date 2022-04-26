const router = require('express').Router();
const { Song } = require('../../models');

router.post('/:id', async (req, res) => {
    try {
      const newSong = await Song.create({
        ...req.body,
      });
  
      res.status(200).json(newSong);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  module.exports = router;