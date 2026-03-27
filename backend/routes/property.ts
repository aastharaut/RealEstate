import express from "express";
import { checkAuthentication } from "../middleware/auth";
import propertyController from "../controllers/propertyController";
import { validateAddProperty } from "../validations/propertyValidation";

const router = express.Router();
router.use(checkAuthentication);

router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);
router.post("/", validateAddProperty, propertyController.addProperty);
router.put("/:id", validateAddProperty, propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

export default router;
