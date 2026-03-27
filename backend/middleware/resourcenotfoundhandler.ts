import { Request, Response, NextFunction } from "express";

function resourcenotfoundhandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({ message: "Resource not found" });
}

export default resourcenotfoundhandler;
