const router = require('express').Router();
const { Playlist } = require('../../models');

// ADD UPDATE 








router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newPlaylist = await Playlist.create({
      name: req.body.playlistName,
      user_id: req.session.userId,
    });

    res.status(200).json(newPlaylist);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newPlaylist = await Playlist.update({
      ...req.body,
    }, {
      id: req.params.id
    });

    res.status(200).json(newPlaylist);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const playlistData = await Playlist.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!playlistData) {
      res.status(404).json({ message: 'No playlist found!' });
      return;
    }

    res.status(200).json(playlistData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
