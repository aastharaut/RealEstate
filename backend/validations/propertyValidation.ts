import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export interface AddPropertyData {
  title: string;
  address: string;
  price: number;
  description?: string;
  image_url?: string;
}

export interface ValidatedRequest<T = any> extends Request {
  validatedBody?: T;
}

const addPropertySchema = Joi.object<AddPropertyData>({
  title: Joi.string().min(2).max(200).required(),
  address: Joi.string().min(5).max(500).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().allow("").max(2000),
  image_url: Joi.string().uri().allow(""),
});

export const validateAddProperty = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = addPropertySchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }

  (req as ValidatedRequest<AddPropertyData>).validatedBody = value;
  next();
};
