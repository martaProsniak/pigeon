import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json(user);
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
