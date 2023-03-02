import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import jwt from "jsonwebtoken";
import sha256 from "sha256";
import { getUserWithoutPassword } from "../utils";

const secret = "secret";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      tweets: {
        select: {
          title: true,
          content: true,
          createdAt: true,
          id: true,
        },
      },
      receivedFriendRequest: {
        select: {
          id: true,
          status: true,
          invitator: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
      sendFriendRequests: {
        select: {
          id: true,
          status: true,
          receiver: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (user) {
    res.status(200).json(getUserWithoutPassword(user));
  }

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
};

export const getTweetsByUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const tweets = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .tweets({
      orderBy: { createdAt: Prisma.SortOrder.desc } as any,
    });

  if (tweets?.length) {
    res.status(200).json(tweets);
  }
  if (tweets?.length === 0) {
    res.send("User didn't published any tweets yet");
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = sha256(password) === existingUser.password;
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (existingUser)
      return res.status(400).json({
        message:
          "This email is already taken! Please use another one to create new account or sign in.",
      });

    const hashedPassword = sha256(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email: newUser.email, id: newUser.id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: newUser, token });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  if (!req?.userId) {
    return res.status(401).json({ message: "Please log in to see the users" });
  }
  const users = await prisma.user.findMany();

  if (users?.length) {
    const usersWithoutPassword = users.map((user) =>
      getUserWithoutPassword(user)
    );
    res.status(200).json(usersWithoutPassword);
  }
  if (users?.length === 0) {
    res.send("No users in service yet!");
  }
};

export const inviteToFriends = async (req: Request, res: Response) => {
  if (!req?.userId) {
    return res.status(401).json({ message: "Please log in to invite friends" });
  }

  const { id } = req.params;

  const friendRequest = await prisma.friendRequest.create({
    data: {
      invitatorId: Number(req.userId),
      receiverId: Number(id),
    },
  });

  if (friendRequest) {
    res.status(201).json({ friendRequest });
  }
};

export const getPendingFriendRequests = async (req: Request, res: Response) => {
  if (!req?.userId) {
    return res
      .status(401)
      .json({ message: "Please log in to see the friend requests" });
  }

  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      receiverId: Number(req.userId),
      status: String("PENDING"),
    },
  });

  res.status(200).json({ friendRequests });
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  if (!req?.userId) {
    return res
      .status(401)
      .json({ message: "Please log in to accept the invitation" });
  }

  const { id } = req.params;

  const updatedFriendRequest = await prisma.friendRequest.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "ACCEPTED",
    },
  });

  res.status(204).json({ updatedFriendRequest });
};

export const denyFriendRequest = async (req: Request, res: Response) => {
  if (!req?.userId) {
    return res
      .status(401)
      .json({ message: "Please log in to reject the invitation" });
  }

  const { id } = req.params;

  const updatedFriendRequest = await prisma.friendRequest.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "DENIED",
    },
  });

  res.status(204).json({ updatedFriendRequest });
};

export const deleteFriendRequest = async (req: Request, res: Response) => {
  if (!req?.userId) {
    return res
      .status(401)
      .json({ message: "Please log in delete friend request" });
  }

  const { id } = req.params;

  const friendRequest = await prisma.friendRequest.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (friendRequest?.invitatorId !== Number(req.userId)) {
    return res
      .status(409)
      .json({ message: "You cannot delete another users requests" });
  }

  const result = await prisma.friendRequest.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(204).json(result);
};
