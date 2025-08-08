import express from "express";
import * as playlistController from "../controllers/playlistController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a playlist (auth required)
router.post("/", verifyToken, playlistController.createPlaylist);

// Get all playlists (public or protected — your choice)
router.get("/", playlistController.getAllPlaylists);

// Get a playlist by ID
router.get("/:id", playlistController.getPlaylistById);

// Update a playlist (auth required)
router.put("/:id", verifyToken, playlistController.updatePlaylist);

// Delete a playlist (auth required)
router.delete("/:id", verifyToken, playlistController.deletePlaylist);

export default router;

