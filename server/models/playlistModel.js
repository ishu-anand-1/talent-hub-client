const db = require("../config/db");

const PlaylistModel = {
  create: (playlistData, callback) => {
    const { name, description, occasion, song_list } = playlistData;
    const sql = `
      INSERT INTO playlists (name, description, occasion, song_list)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [name, description, occasion, song_list], callback);
  },

  getAll: (callback) => {
    const sql = `SELECT * FROM playlists ORDER BY created_at DESC`;
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `SELECT * FROM playlists WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  update: (id, updatedData, callback) => {
    const { name, description, occasion, song_list } = updatedData;
    const sql = `
      UPDATE playlists
      SET name = ?, description = ?, occasion = ?, song_list = ?
      WHERE id = ?
    `;
    db.query(sql, [name, description, occasion, song_list, id], callback);
  },

  delete: (id, callback) => {
    const sql = `DELETE FROM playlists WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = PlaylistModel;
