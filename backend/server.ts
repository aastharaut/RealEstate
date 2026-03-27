import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import resourcenotfoundhandler from "./middleware/resourcenotfoundhandler";
import errorHandler from "./middleware/errorHandler";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // global middleware
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, World!");
});

app.use(resourcenotfoundhandler);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
