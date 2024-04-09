const express = require('express');
const { getFeedPosts, getUserPosts, likePost} = require('../controllers/Posts');
const { verifyToken} = require('../middlewares/auth');

const router = express.Router();

//READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

//UPDATE
router.get('/:id/like', verifyToken, likePost);

module.exports = router;
