import { Router } from "express";
import { submitLeaveRequest, manageLeaveRequest } from "../controllers/leaveRequestController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const leaveRouter = Router();

// Employees can submit leave requests
leaveRouter.post("/leave", isAuthenticated, authorizeRoles("Employee"), submitLeaveRequest);

// HR Managers can approve/reject leave requests
leaveRouter.put("/leave/:requestId", isAuthenticated, authorizeRoles("HR Manager"), manageLeaveRequest);

export default leaveRouter;
