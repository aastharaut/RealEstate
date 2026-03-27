import express, { Request, Response } from "express";
import router from "./routes";
import resourcenotfoundhandler from "./middleware/resourcenotfoundhandler";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import dotenv from "dotenv";
import "./models/index";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(resourcenotfoundhandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
