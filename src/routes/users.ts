import express from "express";
import { getUser, getTweetsByUser, signin, signup } from "../controllers/users";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/tweets", getTweetsByUser);
router.post("/signin", signin);
router.post("/signup", signup);;

export default router;
