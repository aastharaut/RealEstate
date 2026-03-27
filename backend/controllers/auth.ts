import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await authService.signup(req);
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send({});
    }
  },
  login: (req: Request, res: Response, next: NextFunction) => {},
};
export default authController;
