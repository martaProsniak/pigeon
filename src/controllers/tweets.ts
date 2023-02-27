import { Request, Response } from "express";

export const getAllTweets = (req: Request, res: Response) => {
  res.send("List of tweets");
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
