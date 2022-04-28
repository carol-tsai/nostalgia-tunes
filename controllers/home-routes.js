const router = require("express").Router();
const { User, Playlist, Song } = require("../models");
const { route } = require("./api/userRoutes");

router.get("/", async (req, res) => {
  const playlistData = await Playlist.findAll();
  const playlists = playlistData.map(playlist => {return playlist.get({plain: true})})
  console.log(playlists);
  res.render("homepage", {
    playlists,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
