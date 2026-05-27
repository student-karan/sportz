import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import MatchRouter from "./routes/matches.js";
import { ExpressError } from "./utils/utility.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/matches", MatchRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ExpressError) {
    res.status(err.status).json({ success: false, err: err.message });
  } else {
    res.status(500).json({ success: false, err: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});