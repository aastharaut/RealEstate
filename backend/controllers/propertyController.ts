import { Response } from "express";
import Property from "../models/Property";
import {
  ValidatedRequest,
  AddPropertyData,
} from "../validations/propertyValidation";

export interface AuthRequest extends ValidatedRequest<AddPropertyData> {
  user?: { id: number; role: string; name: string };
}

const propertyController = {
  getAllProperties: async (req: AuthRequest, res: Response) => {
    try {
      const properties = await Property.findAll();
      res.json({ properties });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getPropertyById: async (req: AuthRequest, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      if (isNaN(propertyId))
        return res.status(400).json({ message: "Invalid property ID" });

      const property = await Property.findByPk(propertyId);
      if (!property)
        return res.status(404).json({ message: "Property not found" });

      res.json({ property });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  addProperty: async (req: AuthRequest, res: Response) => {
    try {
      if (req.user!.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }

      const { title, address, price, description, image_url } =
        req.validatedBody!;
      const property = await Property.create({
        title,
        address,
        price,
        description,
        image_url,
      });

      res.status(201).json({ property });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  updateProperty: async (req: AuthRequest, res: Response) => {
    try {
      if (req.user!.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }

      const propertyId = Number(req.params.id);
      if (isNaN(propertyId))
        return res.status(400).json({ message: "Invalid property ID" });

      const property = await Property.findByPk(propertyId);
      if (!property)
        return res.status(404).json({ message: "Property not found" });

      await property.update(req.validatedBody!);
      res.json({ property });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteProperty: async (req: AuthRequest, res: Response) => {
    try {
      if (req.user!.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
      const propertyId = Number(req.params.id);
      if (isNaN(propertyId))
        return res.status(400).json({ message: "Invalid property ID" });

      const deleted = await Property.destroy({ where: { id: propertyId } });
      if (!deleted)
        return res.status(404).json({ message: "Property not found" });

      res.json({ message: "Property deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default propertyController;
