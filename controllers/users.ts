import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.send(`Hello user ${id}`);
};
