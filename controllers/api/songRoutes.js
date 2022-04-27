const router = require('express').Router();
const { Song } = require('../../models');
// require getChart funciton
const { getChart } = require('billboard-top-100');

router.post('/billboard', async (req, res) => {
  console.log(req.body);
  // Get top 20 songs from selected day
  getChart('hot-100', req.body.day, (err, chart) => {
    if (err) {
      console.log(err);
      res.json(err);
      return;
    };

    // array of top 100 songs for week of August 27, 2016
    currentSongs = chart.songs
    currentSongs = currentSongs.slice(0,20);
    res.json(currentSongs);
  });
  
})

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