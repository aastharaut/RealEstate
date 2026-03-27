// validations/favouriteValidation.ts
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define the shape of data for adding a favourite
export interface AddFavouriteData {
  propertyId: number;
}

// Generic validated request type
export interface ValidatedRequest<T = any> extends Request {
  validatedBody: T;
}

// Joi schema for adding a favourite
const addFavouriteSchema = Joi.object<AddFavouriteData>({
  propertyId: Joi.number().integer().required().messages({
    "any.required": "Property ID is required",
    "number.base": "Property ID must be a number",
  }),
});

// Middleware
export const validateAddFavourite = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = addFavouriteSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, errors });
  }

  (req as ValidatedRequest<AddFavouriteData>).validatedBody = value;
  next();
};
