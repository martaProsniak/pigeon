import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// TODO move secret to .env file
const secret = "test";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (token) {
      const decodedData = jwt.verify(token, secret);
      console.log(decodedData)

      // req.userId = decodedData.sub || undefined;
    }
  } catch (e) {}
};
