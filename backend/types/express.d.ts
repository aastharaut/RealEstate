import { Request } from "express";

export interface AuthUser {
  id: number;
  name: string;
  role: "BUYER" | "ADMIN";
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
