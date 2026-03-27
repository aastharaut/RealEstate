import { Request, Response } from "express"; // ← add Request
import Favourite from "../models/Favourite";
import Property from "../models/Property";
import { AddFavouriteData } from "../validations/favouriteValidation";

interface AuthRequest<T = any> extends Request {
  user?: { id: number; name: string; role: string };
  validatedBody?: T;
}
interface FavouriteInstance {
  id: number;
  user_id: number;
  property_id: number;
  createdAt: Date;
  property?: any; // ← lowercase
}
const favouritesController = {
  // GET /api/favourites
  getMyFavourites: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;

      const favourites = await Favourite.findAll({
        where: { user_id: userId },
        include: [{ model: Property, as: "property" }],
      });

      res.json({
        success: true,
        favourites: (favourites as unknown as FavouriteInstance[]).map(
          (fav) => ({
            id: fav.id,
            property: fav.property, // ← lowercase
            createdAt: fav.createdAt,
          }),
        ),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/favourites
  addFavourite: async (req: AuthRequest<AddFavouriteData>, res: Response) => {
    try {
      const userId = req.user!.id;
      const { propertyId } = req.validatedBody!;

      // Check if already favourite
      const existing = await Favourite.findOne({
        where: { user_id: userId, property_id: propertyId },
      });
      if (existing)
        return res
          .status(400)
          .json({ success: false, message: "Property already in favourites" });

      const favourite = await Favourite.create({
        user_id: userId,
        property_id: propertyId,
      });

      res.status(201).json({ success: true, favourite });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE /api/favourites/:propertyId
  removeFavourite: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const propertyId = Number(req.params.propertyId);

      if (isNaN(propertyId))
        return res
          .status(400)
          .json({ success: false, message: "Invalid property ID" });

      const deleted = await Favourite.destroy({
        where: { user_id: userId, property_id: propertyId },
      });

      if (!deleted)
        return res
          .status(404)
          .json({ success: false, message: "Favourite not found" });

      res.json({ success: true, message: "Removed from favourites" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};

export default favouritesController;
