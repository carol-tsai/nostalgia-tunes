// import models
const User = require('./User');
const Playlist = require('./Playlist');
const Song = require('./Song');
const PlaylistSong = require('./PlaylistSong');

// Playlist belongs to user
Playlist.belongsTo(User, {
   foreignKey: 'user_id',
});

// Categories have many Products
User.hasMany(Playlist, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE',
})

// Products belongToMany Tags (through ProductTag)
Playlist.belongsToMany(Song, {
   through: {
      model: PlaylistSong,
      unique: false
   },
});
// Tags belongToMany Products (through ProductTag)
Song.belongsToMany(Playlist, {
   through: {
      model: PlaylistSong,
      unique: false
   },
});

module.exports = {
   User,
   Playlist,
   Song,
   PlaylistSong,
};

