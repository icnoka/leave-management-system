import { Router } from "express";
import { createLeaveRequest,  deleteLeaveRequest, getLeaveRequest, updateLeaveRequest,reviewLeaveRequest } from "../controllers/leaveRequestController.js";
import { isAuthenticated} from "../middlewares/auth.js";

const leaveRouter = Router();

// Employees can submit leave requests

/**
 * @swagger
 * /api/leaveRequest/create:
 *   post:
 *     summary: Create a new leave request
 *     tags: [LeaveRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveType
 *               - startDate
 *               - daysRequested
 *             properties:
 *               leaveType:
 *                 type: string
 *                 example: Annual
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-20
 *               reason:
 *                 type: string
 *                 example: Family emergency
 *               year:
 *                 type: number
 *                 example: 2025
 *               standInPersonId:
 *                 type: string
 *                 example: 64d4b0e5123456789abcde01
 *               daysRequested:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Leave request submitted successfully
 *       400:
 *         description: Missing required fields or duplicate request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only employees can submit leave requests
 *       500:
 *         description: Internal Server Error
 */

leaveRouter.post("/leaveRequest/create", isAuthenticated, createLeaveRequest);

/**
 * @swagger
 * /api/leaveRequest/update:
 *   put:
 *     summary: Update a leave request
 *     tags: [LeaveRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveRequestId
 *             properties:
 *               leaveRequestId:
 *                 type: string
 *                 example: 64d4b0e5123456789abcde01
 *               leaveType:
 *                 type: string
 *                 example: Sick
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-22
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-25
 *               reason:
 *                 type: string
 *                 example: Medical check-up
 *     responses:
 *       200:
 *         description: Leave request updated successfully
 *       400:
 *         description: Missing leaveRequestId
 *       404:
 *         description: Leave request not found
 *       500:
 *         description: Internal Server Error
 */

leaveRouter.put("/leaveRequest/update", isAuthenticated,updateLeaveRequest);

/**
 * @swagger
 * /api/leaveRequest/delete:
 *   delete:
 *     summary: Delete a leave request
 *     tags: [LeaveRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveRequestId
 *             properties:
 *               leaveRequestId:
 *                 type: string
 *                 example: 64d4b0e5123456789abcde01
 *     responses:
 *       200:
 *         description: Leave request deleted successfully
 *       404:
 *         description: Leave request not found
 *       500:
 *         description: Internal Server Error
 */

leaveRouter.delete("/leaveRequest/delete",isAuthenticated, deleteLeaveRequest);

/**
 * @swagger
 * /api/leaveRequest/get-id:
 *   post:
 *     summary: Get a leave request by ID
 *     tags: [LeaveRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveRequestId
 *             properties:
 *               leaveRequestId:
 *                 type: string
 *                 example: 64d4b0e5123456789abcde01
 *     responses:
 *       200:
 *         description: Leave request retrieved successfully
 *       400:
 *         description: leaveRequestId is required
 *       404:
 *         description: Leave request not found
 *       500:
 *         description: Internal Server Error
 */

leaveRouter.get("/leaveRequest/get-id",isAuthenticated, getLeaveRequest);

/**
 * @swagger
 * /api/leaveRequest/review:
 *   post:
 *     summary: Review (approve/reject) a leave request
 *     tags: [LeaveRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveRequestId
 *               - action
 *             properties:
 *               leaveRequestId:
 *                 type: string
 *                 example: 64d4b0e5123456789abcde01
 *               action:
 *                 type: string
 *                 enum: [approve, reject]
 *                 example: approve
 *               comments:
 *                 type: string
 *                 example: Approved for 5 days leave
 *     responses:
 *       200:
 *         description: Leave request processed successfully
 *       400:
 *         description: Invalid action or insufficient leave balance
 *       403:
 *         description: Unauthorized role
 *       404:
 *         description: Leave request not found
 *       500:
 *         description: Internal Server Error
 */

// Route for approving leave requests, accessible only to HR and Line Managers
leaveRouter.post('/leaveRequest/review', isAuthenticated,  reviewLeaveRequest);



export default leaveRouter;
