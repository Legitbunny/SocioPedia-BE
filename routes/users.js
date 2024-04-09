const express = require('express');
const {
    getUser,
    getUserFriends,
    addRemoveFriends,
} =  require("../controllers/Users.js");

const {verifyToken} = require("../middlewares/auth.js");

const router = express.Router();

//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

module.exports = router;