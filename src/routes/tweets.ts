import express from "express";
import {
  getAllTweets,
  getTweetsByUser,
  createNewTweet,
  deleteTweet,
} from "../controllers/tweets";

const router = express.Router();

router.get("/", getAllTweets);
router.get("/user/:id", getTweetsByUser);
router.post("/user/:id", createNewTweet);
router.delete("/:id", deleteTweet);

export default router;
