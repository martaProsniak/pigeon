import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import jwt from "jsonwebtoken";
import sha256 from "sha256";
import { getUserWithoutPassword } from "../utils";

const secret = "test";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
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
