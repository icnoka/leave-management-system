import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  resetPassword,
  verifyCode,
} from "../controllers/resetPasswordController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const passwordRouter = Router();

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset via email (sends OTP)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent if email exists
 *       404:
 *         description: No user found with the given email
 *       500:
 *         description: Internal Server Error
 */


passwordRouter.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/auth/verify-code:
 *   post:
 *     summary: Verify OTP sent for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newOtp
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               newOtp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Code is valid
 *       400:
 *         description: Invalid or expired code
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


passwordRouter.post("/verify-code", verifyCode);

/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Change password when logged in
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldPassword123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword456
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password incorrect or new password invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


passwordRouter.post('/change-password', isAuthenticated, changePassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using verified OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newOtp
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               newOtp:
 *                 type: string
 *                 example: 123456
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired code / password validation failed
 *       500:
 *         description: Internal Server Error
 */


passwordRouter.post("/reset-password", resetPassword);

export default passwordRouter;