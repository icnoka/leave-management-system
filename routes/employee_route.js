import { Router } from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { createEmployeeProfile, getEmployeeById, updateEmployeeProfile, getUserWithLeaveDetails, getEmployees } from "../controllers/employeeControllerr.js";


const staffRouter = Router();

/**
 * @swagger
 * /api/employee/create-profile:
 *   post:
 *     summary: Create an employee profile
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - department
 *               - role
 *               - userAccountId
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Vida
 *               lastName:
 *                 type: string
 *                 example: Owusu
 *               email:
 *                 type: string
 *                 example: vida@example.com
 *               department:
 *                 type: string
 *                 example: 64c81b7e3a3f03c123456789
 *               role:
 *                 type: string
 *                 example: 64c81b9f3a3f03c987654321
 *               mobile:
 *                 type: string
 *                 example: +233241234567
 *               staffID:
 *                 type: string
 *                 example: EMP123
 *               jobTitle:
 *                 type: string
 *                 example: Backend Developer
 *               address:
 *                 type: string
 *                 example: 123 Spintex Road
 *               maritalStatus:
 *                 type: string
 *                 example: Single
 *               gender:
 *                 type: string
 *                 example: Female
 *               userAccountId:
 *                 type: string
 *                 example: 64c81c0a3a3f03c789123456
 *     responses:
 *       201:
 *         description: Employee profile created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

staffRouter.post('/employee/create-profile',isAuthenticated, createEmployeeProfile);

/**
 * @swagger
 * /api/employee/update-profile:
 *   put:
 *     summary: Update an employee profile
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - userAccountId
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 64c81d1a3a3f03c456123789
 *               firstName:
 *                 type: string
 *                 example: Vida
 *               lastName:
 *                 type: string
 *                 example: Owusu
 *               email:
 *                 type: string
 *                 example: vida@example.com
 *               department:
 *                 type: string
 *                 example: 64c81b7e3a3f03c123456789
 *               role:
 *                 type: string
 *                 example: 64c81b9f3a3f03c987654321
 *               mobile:
 *                 type: string
 *                 example: +233241234567
 *               staffID:
 *                 type: string
 *                 example: EMP123
 *               gender:
 *                 type: string
 *                 example: Female
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1995-05-21
 *               maritalStatus:
 *                 type: string
 *                 example: Married
 *               address:
 *                 type: string
 *                 example: Accra, Ghana
 *               userAccountId:
 *                 type: string
 *                 example: 64c81c0a3a3f03c789123456
 *     responses:
 *       200:
 *         description: Employee profile updated successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */

staffRouter.put('/employee/update-profile',isAuthenticated, updateEmployeeProfile);

/**
 * @swagger
 * /api/employee/get-id:
 *   post:
 *     summary: Get an employee by ID
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: 64c81d1a3a3f03c456123789
 *     responses:
 *       200:
 *         description: Employee found
 *       400:
 *         description: Employee ID is required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */

staffRouter.get('/employee/get-id',isAuthenticated, getEmployeeById);

/**
 * @swagger
 * /api/employee/filter:
 *   get:
 *     summary: Get employees with optional filters
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by last name
 *       - in: query
 *         name: staffId
 *         schema:
 *           type: string
 *         description: Filter by staff ID
 *       - in: query
 *         name: dateOfBirth
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date of birth
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: List of employees
 *       404:
 *         description: No employees found
 *       500:
 *         description: Internal Server Error
 */

staffRouter.get('/employee/filter',isAuthenticated, getEmployees);

/**
 * @swagger
 * /api/employee/leave-details:
 *   post:
 *     summary: Get employee profile with leave history and balance
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userAccountId
 *             properties:
 *               userAccountId:
 *                 type: string
 *                 example: 64c81c0a3a3f03c789123456
 *     responses:
 *       200:
 *         description: Employee with leave details
 *       400:
 *         description: User Account ID is required
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal Server Error
 */

staffRouter.get("/employee/leave-details", isAuthenticated, getUserWithLeaveDetails);


export default staffRouter
