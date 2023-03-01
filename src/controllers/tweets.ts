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
  const { id: authorId } = req.params;
  const { title, content } = req.body;

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
  const post = await prisma.tweet.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
};
