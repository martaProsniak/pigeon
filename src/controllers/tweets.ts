import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getAllTweets = async (req: Request, res: Response) => {
  const tweets = await prisma.tweet.findMany({
    orderBy: { createdAt: Prisma.SortOrder.desc } as any,
  });

  res.status(200).json(tweets);
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
    res.send("User didn't published any tweets");
  }
};

export const createNewTweet = (req: Request, res: Response) => {
  res.send("Tweet created");
};

export const deleteTweet = (req: Request, res: Response) => {
  res.send("Tweet deleted");
};
