import { Router } from "express";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/roleController.js";



const roleRouter = Router();

/**
 * @swagger
 * /api/roles/add:
 *   post:
 *     summary: Add a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: Employee
 *               description:
 *                 type: string
 *                 example: Employee with limited access
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Role already exists
 *       500:
 *         description: Internal Server Error
 */


roleRouter.post('/roles/add', addRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get roles by ID or name
 *     tags: [Role]
 *     parameters:
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: string
 *         description: ID of the role
 *       - in: query
 *         name: roleName
 *         schema:
 *           type: string
 *         description: Name of the role
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 *       404:
 *         description: No roles found
 *       500:
 *         description: Internal Server Error
 */

roleRouter.get('/roles', getRoles);

/**
 * @swagger
 * /api/roles/update:
 *   patch:
 *     summary: Update an existing role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64c49ff8a1a244d4b54fe0c3
 *               roleName:
 *                 type: string
 *                 example: hr manager
 *               description:
 *                 type: string
 *                 example: Human Resource Manager role
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */

roleRouter.put('/roles/update', updateRole);

/**
 * @swagger
 * /api/roles/delete:
 *   delete:
 *     summary: Soft delete a role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64c49ff8a1a244d4b54fe0c3
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */

roleRouter.delete('/roles/delete', deleteRole);

export default roleRouter;

