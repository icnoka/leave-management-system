import { Router } from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { createEmployeeProfile, getEmployeeById, updateEmployeeProfile, getUserWithLeaveDetails, getEmployees } from "../controllers/employeeControllerr.js";


const employeeRouter = Router();

employeeRouter.post('/employee',isAuthenticated, createEmployeeProfile);
employeeRouter.patch('/employee',isAuthenticated, updateEmployeeProfile);
employeeRouter.get('/employee',isAuthenticated, getEmployeeById);
employeeRouter.get('/employee/filter',isAuthenticated, getEmployees);
employeeRouter.get("/employee/leave-details", isAuthenticated, getUserWithLeaveDetails);





export default employeeRouter
