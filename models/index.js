// import models
const User = require('./User');
const Playlist = require('./Playlist');
const Song = require('./Song');


// Playlist belongs to user
Playlist.belongsTo(User, {
   foreignKey: 'user_id',
});

// Categories have many Products
User.hasMany(Playlist, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE',
})

Song.belongsTo(Playlist, {
   foreignKey: 'playlist_id',
});

// Categories have many Products
Playlist.hasMany(Song, {
   foreignKey: 'playlist_id',
   onDelete: 'CASCADE',
})

module.exports = {
   User,
   Playlist,
   Song,
};

