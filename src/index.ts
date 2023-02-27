import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import tweetsRoutes from "./routes/tweets";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

app.use("/users", userRoutes);
app.use("/tweets", tweetsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
