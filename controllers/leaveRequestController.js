import { LeaveModel } from "../models/leave_request.js";
import { EmployeeModel } from "../models/employee.js";
import { LeaveBalanceModel } from "../models/leave_balance.js";
import { mailTransport } from "../config/mail.js";

// Only Employees are allowed to create leave request
export const createLeaveRequest = async (req, res, next) => {
  try {
    const { leaveType, startDate, reason, year, standInPersonId, daysRequested } = req.body;

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user is an employee
    const employee = await EmployeeModel.findOne({ userAccountId: req.user.userId });

    if (!employee) {
      console.log(`No employee found for user ID: ${req.user.userId}`);
      return res.status(403).json({ message: "Only employees can submit leave requests" });
    }

    // Validate required fields
    if (!startDate || !daysRequested) {
      return res.status(400).json({ message: "Start date and number of days requested are required." });
    }

    // Convert startDate to a Date object
    const start = new Date(startDate);

    // Calculate the end date (excluding weekends)
    let end = new Date(start);
    let remainingDays = daysRequested;

    while (remainingDays > 0) {
      end.setDate(end.getDate() + 1); // Move to the next day

      if (end.getDay() !== 6 && end.getDay() !== 0) {
        remainingDays--;
      }
    }

    // Check for existing leave requests with the same details
    const existingRequest = await LeaveModel.findOne({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate: end, 
      reason
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Leave request already exists" });
    }

    // Create leave request
    const leaveRequest = await LeaveModel.create({
      employeeId: employee._id,
      leaveType,
      daysRequested,
      startDate,
      endDate: end,
      reason,
      year,
      standInPersonId,
      createdBy: req.user.userId,
      modifiedBy: req.user.userId
    });

    res.status(201).json({ message: "Leave request submitted successfully", leaveRequest });

  } catch (error) {
    next(error);
  }
};



// Function to delete a leave request
export const deleteLeaveRequest = async (req, res, next) => {
  try {
     // Get the leave request ID from the URL parameters
    const { leaveRequestId } = req.body;

    // Find and delete the leave request
    const leaveRequest = await LeaveModel.findByIdAndDelete(leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Function to update a leave request
export const updateLeaveRequest = async (req, res, next) => {
  try {
    // Get the leave request ID from the request body
    const { leaveRequestId, leaveType, startDate, endDate, reason } = req.body;

    if (!leaveRequestId) {
      return res.status(400).json({ message: "Leave request ID is required in the request body." });
    }

    // Find the leave request to update
    const leaveRequest = await LeaveModel.findById(leaveRequestId);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Update the leave request fields
    leaveRequest.leaveType = leaveType || leaveRequest.leaveType;
    leaveRequest.startDate = startDate || leaveRequest.startDate;
    leaveRequest.endDate = endDate || leaveRequest.endDate;
    leaveRequest.reason = reason || leaveRequest.reason;

    // Save the updated leave request
    await leaveRequest.save();

    res.status(200).json({ message: "Leave request updated successfully", leaveRequest });
  } catch (error) {
    next(error);
  }
};



// Function to review a leave request
export const reviewLeaveRequest = async (req, res, next) => {
  const { leaveRequestId, action, comments } = req.body; // action can be approved or rejected
  const userId = req.user.userId; 
  const userRole = req.user.role;

  try {
      const leaveRequest = await LeaveModel.findById(leaveRequestId);
      if (!leaveRequest) {
          return res.status(404).json({ message: "Leave request not found" });
      }

      const validRoles = {
          "line manager": {
              approvedField: "isLinemanagerApproved",
              idField: "lineManagerId",
              approvedDateField: "lineManagerApprovedDate",
              rejectedDateField: "lineManagerRejectedDate",
          },
          "hr manager": {
              approvedField: "isHrManagerApproved",
              idField: "hrManagerId",
              approvedDateField: "hrManagerApprovedDate",
              rejectedDateField: "hrManagerRejectedDate",
          }
      };

      const config = validRoles[userRole];
      if (!config) {
          return res.status(403).json({ message: "Access denied. You are not authorized to modify this leave request." });
      }

      // Retrieve the leave balance
      let leaveBalance = await LeaveBalanceModel.findOne({ employeeId: leaveRequest.employeeId, year: leaveRequest.year });

      // If leave balance does not exist, create a new one with default values
      if (!leaveBalance) {
          leaveBalance = await LeaveBalanceModel.create({
              employeeId: leaveRequest.employeeId,
              year: leaveRequest.year,
              entitlement: 20, // Set a default entitlement value
              daysAvailable: 20, // Set days remaining equal to entitlement
              daysUsed: 0,
              createdBy: userId,
              modifiedBy: userId
          });
      }
      

      if (action === "approve") {
          // Check if the requested days fit within the remaining balance
          if (leaveRequest.daysRequested > leaveBalance.daysAvailable) {
              return res.status(400).json({ message: "Insufficient leave balance." });
          }

          // Proceed with approval
          leaveRequest[config.idField] = userId;
          leaveRequest[config.approvedField] = true;
          leaveRequest[config.approvedDateField] = new Date();

          // Update leave balance
          leaveBalance.daysUsed += leaveRequest.daysRequested; // Increment days used
          leaveBalance.daysAvailable -= leaveRequest.daysRequested; // Decrement remaining days
          await leaveBalance.save();
      } else if (action === "reject") {
          
          leaveRequest.status = "Rejected";
          leaveRequest[config.approvedField] = false;
          leaveRequest[config.rejectedDateField] = new Date();
      } else {
          return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'." });
      }

      // Set comments regardless of approval or rejection
      leaveRequest.comments = comments || "No comments provided";
      if (leaveRequest.isLinemanagerApproved && leaveRequest.isHrManagerApproved) {
        leaveRequest.status = "Approved";

        // Send email when leave is approved
        const employee = await EmployeeModel.findById(leaveRequest.employeeId);
        if (employee && employee.email) {
            await mailTransport.sendMail({
                from: '"Mojo Payments Ltd"<noreply@mojopayments.com>',
                to: employee.email,
                subject: "Leave Request Approved",
                text: `Dear ${employee.firstName},\n\nYour leave request for ${leaveRequest.daysRequested} days starting from ${leaveRequest.startDate} to ${leaveRequest.endDate} has been approved.\n\nBest regards,\nHR Manager`
            });
        }
    } else if (!leaveRequest.isLinemanagerApproved && !leaveRequest.isHrManagerApproved) {
        leaveRequest.status = "Rejected";
    } else {
        leaveRequest.status = "Pending";
    }

    await leaveRequest.save();
    res.status(200).json({ message: "Leave request processed successfully", leaveRequest });

} catch (error) {
    next(error);
}
};

// Function to get a leave request by ID
export const getLeaveRequest = async (req, res, next) => {
  try {
      const { leaveRequestId } = req.body;

      if (!leaveRequestId) {
          return res.status(400).json({ message: "leaveRequestId is required." });
      }

      const leaveRequest = await LeaveModel.findById(leaveRequestId)
          .populate({
              path: 'employeeId', // Populate the employeeId field
              select: 'firstName lastName email leaveBalanceId', // Select relevant fields
              populate: {
                  path: 'leaveBalanceId', // Populate leaveBalanceId
                  match: { year: new Date().getFullYear() }, // Match current year
                  select: 'daysAvailable daysUsed entitlement' // Select fields from LeaveBalance
              }
          });

      if (!leaveRequest) {
          return res.status(404).json({ message: "Leave request not found." });
      }

      res.status(200).json({
          leaveRequestId,
          leaveRequest,
      });
  } catch (error) {
      next(error);
  }
};
