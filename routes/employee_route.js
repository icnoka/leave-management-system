import { Router } from "express";
import { isAuthenticated, hasRole} from "../middlewares/auth.js";
import { createEmployeeProfile, getEmployeeById, updateEmployeeProfile, getUserWithLeaveDetails } from "../controllers/employeeControllerr.js";


const employeeRouter = Router();

employeeRouter.post('/employee',isAuthenticated, createEmployeeProfile);
employeeRouter.patch('/employee',isAuthenticated, hasRole('HR'), updateEmployeeProfile);
employeeRouter.get('/employee',isAuthenticated, getEmployeeById);
employeeRouter.get("/employee/leave-details", isAuthenticated, getUserWithLeaveDetails);





export default employeeRouter
