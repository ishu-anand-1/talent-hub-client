const express = require('express');
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, postController.createPost);
router.get('/me', verifyToken, postController.getMyPosts);
router.get('/videos', postController.getAllVideos);

router.delete('/:id', verifyToken, postController.deletePost);




module.exports = router;
