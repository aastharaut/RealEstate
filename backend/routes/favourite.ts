import express from "express";
import { checkAuthentication } from "../middleware/auth";
import favouritesController from "../controllers/favouriteController";
import { validateAddFavourite } from "../validations/favouriteValidation";

const router = express.Router();

router.use(checkAuthentication);
router.get("/", favouritesController.getMyFavourites);
router.post("/", validateAddFavourite, favouritesController.addFavourite);
router.delete("/:propertyId", favouritesController.removeFavourite);

export default router;
