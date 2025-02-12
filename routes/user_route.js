import { Router } from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { signup, login, logout} from "../controllers/userController.js";


const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', isAuthenticated, logout)

export default userRouter



