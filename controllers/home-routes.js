const router = require("express").Router();
const { User, Playlist, Song } = require("../models");
const { route } = require("./api/userRoutes");
const withAuth = require("../utils/auth")

router.get("/", async (req, res) => {
  const playlistData = await Playlist.findAll();
  const playlists = playlistData.map(playlist => {return playlist.get({plain: true})})
  console.log(playlists);
  res.render("homepage", {
    playlists,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/profile", withAuth, async (req, res) => {
  console.log(req.session.userId);
  const userData = await User.findByPk(req.session.userId,{
    attributes: { exclude: ['password'] },
    include: [{ model: Playlist }],
  });
  const user = userData.get({plain: true})
  console.log(user);
  res.render("profile", {
    user,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/playlist/:id", withAuth, async (req, res) => {
  console.log(req.session.userId);
  const playlistData = await Playlist.findByPk(req.params.id,{
    // attributes: { exclude: ['password'] },
    include: [{ model: Song }],
  });
  const playlist = playlistData.get({plain: true})
  console.log(playlist);
  res.render("playlist", {
    playlist,
    loggedIn: req.session.loggedIn,
  });
});


router.get("/login", (req, res) => {
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
