import Playlist from "../models/Playlist.js";// Mongoose model

// Create Playlist
export const createPlaylist  = async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).json({
      message: "Playlist created",
      id: playlist._id
    });
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ error: "Failed to create playlist" });
  }
};

// Get All Playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
};

// Get Playlist by ID
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (err) {
    console.error("Error fetching playlist:", err);
    res.status(500).json({ error: "Error fetching playlist" });
  }
};

// Update Playlist
export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist updated successfully", playlist });
  } catch (err) {
    console.error("Error updating playlist:", err);
    res.status(500).json({ error: "Failed to update playlist" });
  }
};

// Delete Playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (err) {
    console.error("Error deleting playlist:", err);
    res.status(500).json({ error: "Failed to delete playlist" });
  }
};
