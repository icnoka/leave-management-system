import { LeaveModel } from "../models/leave_request.js";
import { EmployeeModel } from "../models/employee.js";
import { UserModel } from "../models/user_account.js";

// Submit Leave Request (Employees Only)
export const submitLeaveRequest = async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    
    // Ensure user is authenticated
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Check if the user is an employee
    const employee = await EmployeeModel.findOne({ createdBy: req.user.userId });
    if (!employee) return res.status(403).json({ message: "Only employees can submit leave requests" });

    // Create leave request
    const leaveRequest = await LeaveRequestModel.create({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    res.status(201).json({ message: "Leave request submitted successfully", leaveRequest });

  } catch (error) {
    next(error);
  }
};

// Approve or Reject Leave Request (HR Managers Only)
export const manageLeaveRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // "Approved" or "Rejected"

    // Ensure user is authenticated
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Check if the user is an HR Manager
    const user = await UserModel.findById(req.user.userId);
    if (user.role !== "HR Manager") return res.status(403).json({ message: "Only HR Managers can manage leave requests" });

    // Update leave request
    const leaveRequest = await LeaveRequestModel.findByIdAndUpdate(
      requestId,
      { status, approvedBy: req.user.userId },
      { new: true }
    );

    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    res.status(200).json({ message: `Leave request ${status.toLowerCase()} successfully`, leaveRequest });

  } catch (error) {
    next(error);
  }
};
