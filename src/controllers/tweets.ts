import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getAllTweets = async (req: Request, res: Response) => {
  const tweets = await prisma.tweet.findMany({
    orderBy: { createdAt: Prisma.SortOrder.desc } as any,
  });

  res.status(200).json(tweets);
};

export const createNewTweet = async (req: Request, res: Response) => {
  const authorId = req.userId;
  const { title, content } = req.body;

  if (!authorId) {
    return res.status(401).send({ message: "Log in to add a tweet" });
  }

  const result = await prisma.tweet.create({
    data: {
      title,
      content,
      author: { connect: { id: parseInt(authorId) } },
    },
  });
  res.json(result);
};

export const deleteTweet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authorId = req.userId;

  if (!authorId) {
    return res.status(401).send({ message: "Log in to delete a tweet" });
  }

  const tweetToRemove = await prisma.tweet.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (tweetToRemove?.authorId !== Number(authorId)) {
    return res.status(400).send({message: 'Not possible to delete tweet not added by you. Please make sure to pass the correct tweet id'})
  }

  const result = await prisma.tweet.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(result);
};
