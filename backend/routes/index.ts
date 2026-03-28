import { Router } from "express";
import authRoutes from "./auth";
import favouriteRoutes from "./favourite";
import propertyRoutes from "./property";

const router = Router();

// Mount route files
router.use("/auth", authRoutes);
router.use("/favourites", favouriteRoutes);
router.use("/properties", propertyRoutes);

export default router;
