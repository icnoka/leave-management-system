import { Router } from "express";
import { isAuthenticated} from "../middlewares/auth.js";
import { createEmployeeProfile, getEmployeeById, updateEmployeeProfile, getUserWithLeaveDetails, getEmployees } from "../controllers/employeeControllerr.js";


const staffRouter = Router();

staffRouter.post('/staff',isAuthenticated, createEmployeeProfile);
staffRouter.patch('/staff',isAuthenticated, updateEmployeeProfile);
staffRouter.get('/staff',isAuthenticated, getEmployeeById);
staffRouter.get('/staff/filter',isAuthenticated, getEmployees);
staffRouter.get("/staff/leave-details", isAuthenticated, getUserWithLeaveDetails);





export default staffRouter
