import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = "secret";

interface JwtPayload {
  id: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decodedData = jwt.verify(token, secret) as JwtPayload

      req.userId = decodedData.id
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

export default auth;
