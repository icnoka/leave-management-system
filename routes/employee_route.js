import { Router } from "express";
import { isAuthenticated, hasRole} from "../middlewares/auth.js";
import { createEmployeeProfile, getEmployeeById, updateEmployeeProfile } from "../controllers/employeeControllerr.js";


const employeeRouter = Router();

employeeRouter.patch('/employee/:employeeId',isAuthenticated, hasRole('HR'), updateEmployeeProfile);
employeeRouter.get('/employee/:employeeId',isAuthenticated, getEmployeeById);
employeeRouter.post('/employee',isAuthenticated, createEmployeeProfile);


export default employeeRouter
