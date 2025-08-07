const PlaylistModel = require("../models/playlistModel");

exports.createPlaylist = (req, res) => {
  PlaylistModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to create playlist" });
    res.status(201).json({ message: "Playlist created", id: result.insertId });
  });
};

exports.getAllPlaylists = (req, res) => {
  PlaylistModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch playlists" });
    res.status(200).json(results);
  });
};

exports.getPlaylistById = (req, res) => {
  PlaylistModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching playlist" });
    if (result.length === 0) return res.status(404).json({ error: "Playlist not found" });
    res.status(200).json(result[0]);
  });
};

exports.updatePlaylist = (req, res) => {
  PlaylistModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: "Failed to update playlist" });
    res.status(200).json({ message: "Playlist updated successfully" });
  });
};

exports.deletePlaylist = (req, res) => {
  PlaylistModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete playlist" });
    res.status(200).json({ message: "Playlist deleted successfully" });
  });
};
