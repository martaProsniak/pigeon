import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getAllTweets = async (req: Request, res: Response) => {
  const tweets = await prisma.tweet.findMany({
    orderBy: { createdAt: Prisma.SortOrder.desc } as any,
  });

  res.status(200).json(tweets);
};

export const getTweetsByUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send("Tweets by user " + id);
};

export const createNewTweet = (req: Request, res: Response) => {
  res.send("Tweet created");
};

export const deleteTweet = (req: Request, res: Response) => {
  res.send("Tweet deleted");
};
