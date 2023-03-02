import express from "express";
import {
  getUser,
  getTweetsByUser,
  signin,
  signup,
  getUsers,
  inviteToFriends,
  getPendingFriendRequests,
  acceptFriendRequest,
  denyFriendRequest,
} from "../controllers/users";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/tweets", getTweetsByUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", auth, getUsers);
router.post("/:id/invite", auth, inviteToFriends);
router.get("/:id/friendRequests", auth, getPendingFriendRequests);
router.put("/friendRequests/:id/accept", auth, acceptFriendRequest);
router.put("/friendRequests/:id/deny", auth, denyFriendRequest);

export default router;
