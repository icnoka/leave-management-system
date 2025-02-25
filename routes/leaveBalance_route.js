import {Router} from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createLeaveBalance, deleteLeaveBalance, getLeaveBalance, updateLeaveBalance } from "../controllers/leaveBalanceController.js";

const leaveBalanceRouter = Router();

leaveBalanceRouter.post("/leaveBalance", isAuthenticated, createLeaveBalance);
//leaveBalanceRouter.patch("/leave-balance/:id", isAuthenticated, updateLeaveBalance);
leaveBalanceRouter.delete("/leaveBalance/:id", isAuthenticated, deleteLeaveBalance);
//leaveBalanceRouter.get('/leave-balance/:employeeId/:year', isAuthenticated, getLeaveBalance);

export default leaveBalanceRouter;
