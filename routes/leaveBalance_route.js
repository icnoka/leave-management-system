import {Router} from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createLeaveBalance, deleteLeaveBalance, getLeaveBalance, updateLeaveBalance } from "../controllers/leaveBalanceController.js";

const leaveBalanceRouter = Router();

leaveBalanceRouter.post("/leave-balance", isAuthenticated, createLeaveBalance);
leaveBalanceRouter.patch("/leave-balance/:id", isAuthenticated, updateLeaveBalance);
leaveBalanceRouter.delete("/leave-balance/:id", isAuthenticated, deleteLeaveBalance);
leaveBalanceRouter.get('/leave-balance/:employeeId/:year', isAuthenticated, getLeaveBalance);

export default leaveBalanceRouter
