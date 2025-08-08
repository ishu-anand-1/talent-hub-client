import express from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Create a post
router.post('/', verifyToken, postController.createPost);

// Get posts by logged-in user
router.get('/', verifyToken, postController. getPosts);

// Get all videos (public or protected — your choice)
router.get('/videos', postController.getAllVideos);




// Delete a post
router.delete('/:id', verifyToken, postController.deletePost);

export default router;

