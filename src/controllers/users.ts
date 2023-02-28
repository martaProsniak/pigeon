import { Request, Response } from "express";
import prisma from "../prisma";

export const getUser = async (req: Request, res: Response) => {
  console.log("Getting user");

  const { id } = req.params;
  console.log(id);

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  console.log(user);

  res.status(200).json({ data: user });
};
