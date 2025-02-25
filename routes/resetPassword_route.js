import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  resetPassword,
  verifyCode,
} from "../controllers/resetPasswordController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const passwordRouter = Router();

passwordRouter.post("/password/recover", forgotPassword);

passwordRouter.post("/password/verify-code", verifyCode);

passwordRouter.post('/change-password', isAuthenticated, changePassword);

passwordRouter.post("/password/change", resetPassword);

export default passwordRouter;