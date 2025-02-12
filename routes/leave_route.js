import { Router } from "express";
import { createLeaveRequest,  deleteLeaveRequest, getLeaveRequest, updateLeaveRequest,reviewLeaveRequest } from "../controllers/leaveRequestController.js";
import { isAuthenticated} from "../middlewares/auth.js";

const leaveRouter = Router();

// Employees can submit leave requests
leaveRouter.post("/leave", isAuthenticated, createLeaveRequest);
leaveRouter.patch("/leave/:leaveRequestId", isAuthenticated,updateLeaveRequest);
leaveRouter.delete("/leave/:leaveRequestId",isAuthenticated, deleteLeaveRequest);
leaveRouter.get("/leave",isAuthenticated, getLeaveRequest);


// Route for approving leave requests, accessible only to HR and Line Managers
leaveRouter.post('/leave/approve', isAuthenticated,  reviewLeaveRequest);



export default leaveRouter;
