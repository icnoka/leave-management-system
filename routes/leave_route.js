import { Router } from "express";
import { createLeaveRequest,  deleteLeaveRequest, getLeaveRequest, updateLeaveRequest,reviewLeaveRequest } from "../controllers/leaveRequestController.js";
import { isAuthenticated} from "../middlewares/auth.js";

const leaveRouter = Router();

// Employees can submit leave requests
leaveRouter.post("/leaveRequest", isAuthenticated, createLeaveRequest);
leaveRouter.patch("/leaveRequest", isAuthenticated,updateLeaveRequest);
leaveRouter.delete("/leaveRequest",isAuthenticated, deleteLeaveRequest);
leaveRouter.get("/leaveRequest",isAuthenticated, getLeaveRequest);


// Route for approving leave requests, accessible only to HR and Line Managers
leaveRouter.post('/leaveRequest/approve', isAuthenticated,  reviewLeaveRequest);



export default leaveRouter;
