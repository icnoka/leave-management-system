import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createEmployeeProfile } from "../controllers/employeeControllerr.js";


const employeeRouter = Router();

employeeRouter.post('/auth/employeeProfile', isAuthenticated, createEmployeeProfile);

export default employeeRouter
