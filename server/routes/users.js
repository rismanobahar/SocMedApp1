import express from "express";
import { getUser, getUserFriends, addRemoveFriend, } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
//verifyToken means JWT will check for your token before you get the specific respond
/* READ */
router.get('/:id', verifyToken, getUser); //get the user with particular Id
router.get('/:id/friends', verifyToken, getUserFriends); //get the user's friend

/* UPDATE */
router.patch('/:id/friendId', verifyToken, addRemoveFriend); //update your friend status (add friend or unfriend)

export default router;