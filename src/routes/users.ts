import express from "express";
import { getUser, getTweetsByUser } from "../controllers/users";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/tweets", getTweetsByUser);

export default router;
