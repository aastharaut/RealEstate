import Joi from "joi";
import { Request, Response, NextFunction } from "express";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "BUYER" | "ADMIN";
}

interface LoginData {
  email: string;
  password: string;
}

export interface ValidatedRequest<T = any> extends Request {
  validatedBody: T;
}

const registerSchema = Joi.object<RegisterData>({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("BUYER", "ADMIN").default("BUYER"),
});

const loginSchema = Joi.object<LoginData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validate =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({ success: false, errors });
    }
    (req as ValidatedRequest<T>).validatedBody = value;
    next();
  };

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
export type { RegisterData, LoginData };
