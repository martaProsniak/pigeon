import express from "express";
import {
  getAllTweets,
  createNewTweet,
  deleteTweet,
} from "../controllers/tweets";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllTweets);
router.post("/new", auth, createNewTweet);
router.delete("/:id", auth, deleteTweet);

export default router;
