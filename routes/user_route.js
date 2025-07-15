import { Router } from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { signup, login, logout} from "../controllers/userController.js";

const userRouter = Router();
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - roleName
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: MyPassword123
 *               roleName:
 *                 type: string
 *                 example: employee
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid role or user already exists
 *       500:
 *         description: Internal Server Error
 */

userRouter.post('/signup', signup);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: MyPassword123
 *     responses:
 *       200:
 *         description: Login successful, token returned
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account locked
 *       500:
 *         description: Internal Server Error
 */


userRouter.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Logout failed
 */

userRouter.post('/logout', isAuthenticated, logout)




export default userRouter



