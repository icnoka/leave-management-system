import { Router } from "express";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/departmentController.js";

const departmentRouter = Router();

/**
 * @swagger
 * /api/department/create:
 *   post:
 *     summary: Create a new department
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - departmentName
 *               - description
 *             properties:
 *               departmentName:
 *                 type: string
 *                 example: Human Resources
 *               description:
 *                 type: string
 *                 example: Handles employee management and policies
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Department already exists
 *       500:
 *         description: Internal Server Error
 */

departmentRouter.post('/department/create', createDepartment);

/**
 * @swagger
 * /api/department:
 *   get:
 *     summary: Get all departments
 *     tags: [Department]
 *     responses:
 *       200:
 *         description: List of departments
 *       500:
 *         description: Internal Server Error
 */

departmentRouter.get('/department', getDepartments);

/**
 * @swagger
 * /api/department/update:
 *   put:
 *     summary: Update an existing department
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - departmentId
 *             properties:
 *               departmentId:
 *                 type: string
 *                 example: 64bfc9c0e25f9e00125d78a1
 *               departmentName:
 *                 type: string
 *                 example: People Operations
 *               description:
 *                 type: string
 *                 example: Updated description for department
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Department ID is required
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal Server Error
 */

departmentRouter.put('/department/update', updateDepartment);

/**
 * @swagger
 * /api/department/delete:
 *   delete:
 *     summary: Delete a department
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - departmentId
 *             properties:
 *               departmentId:
 *                 type: string
 *                 example: 64bfc9c0e25f9e00125d78a1
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       400:
 *         description: Department ID is required
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal Server Error
 */

departmentRouter.delete('/department/delete', deleteDepartment);

export default departmentRouter;

