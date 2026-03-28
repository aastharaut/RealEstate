import { Router } from "express";
import authController from "../controllers/auth";
import { validateRegister, validateLogin } from "../validations/validation";

const router = Router();

router.post("/signup", validateRegister, authController.signup);
router.post("/login", validateLogin, authController.login);
export default router;
