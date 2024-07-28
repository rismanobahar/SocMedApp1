//A FILE FOR ROUTING POST FUNCTION

import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
//verifyToken means JWT will check for your token before you get the specific respond
/* READ */
router.get("/", verifyToken, getFeedPosts); //pulls all the post from user that you're following on your feed
router.get("/:userId/posts", verifyToken, getUserPosts); //pulls the specific user post who you're following

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //shows the total amount of likes at certain post

export default router;