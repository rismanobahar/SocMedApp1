//A FILE USED FOR AUTHENTIFICATION FOR LOGIN

import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// router.post("/register", register)
router.post("/login", login); //post the data inserted in login page

export default router;