import { Router } from "express";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";
import { signup, login, logout} from "../controllers/userController.js";


const userRouter = Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);
userRouter.post('/auth/logout', isAuthenticated, logout)

export default userRouter



