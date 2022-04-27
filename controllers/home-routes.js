const router = require("express").Router();
const { User, Playlist, Song } = require("../models");
const { route } = require("./api/user-routes");

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
