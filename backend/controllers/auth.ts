import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import {
  ValidatedRequest,
  RegisterData,
  LoginData,
} from "../validations/validation";

const authController = {
  async signup(req: Request, res: Response) {
    try {
      //type assertion to access validatedBody
      const validatedReq = req as ValidatedRequest<RegisterData>;
      const user = await authService.signup(validatedReq.validatedBody);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error: any) {
      if (error.message === "Email already exists") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      console.error("Signup error:", error);
      res.status(500).json({
        success: false,
        message: "Registration failed. Please try again.",
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const validatedReq = req as ValidatedRequest<LoginData>;
      const { email, password } = validatedReq.validatedBody;
      const { token, user } = await authService.login(email, password);

      res.json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Login failed. Please try again.",
      });
    }
  },
};

export default authController;
