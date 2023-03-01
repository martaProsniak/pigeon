import express from "express";
import {
  getAllTweets,
  createNewTweet,
  deleteTweet,
} from "../controllers/tweets";

const router = express.Router();

router.get("/", getAllTweets);
router.post("/user/:id", createNewTweet);
router.delete("/:id", deleteTweet);

export default router;
