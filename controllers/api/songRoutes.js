const router = require('express').Router();
const { Song } = require('../../models');

router.post('/:playlist_id', async (req, res) => {
    try {
      const newSong = await Song.create({
        ...req.body,
        playlist_id: req.params.playlist_id
      });
  
      res.status(200).json(newSong);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  module.exports = router;