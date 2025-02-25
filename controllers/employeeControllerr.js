import { EmployeeModel } from "../models/employee.js";
import { UserModel } from "../models/user_account.js";
import { LeaveModel } from "../models/leave_request.js";
import { LeaveBalanceModel } from "../models/leave_balance.js";

export const createEmployeeProfile = async (req, res, next) => {
  try {
     
    const { firstName, lastName, email, department, mobile, staffID,jobTitle, userAccountId} = req.body;
    
  if (!userAccountId) {
    return res.status(400).json({ message: "userAccountId is required" });
}


    // Ensure the user is authenticated and user ID is available
    const userId = req.user.userId; // Assuming req.user is set by authentication middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
   // Create employee profile and link to user
   const newEmployee = await EmployeeModel.create({
    firstName,
    lastName,
    email,
    department,
    mobile,
    staffID,
    jobTitle,
    userAccountId,  
    createdBy: userId,  // Get userId from the token
    modifiedBy:userId
  });


    res.status(201).json({ message: "Employee profile created successfully", employee: newEmployee });

  } catch (error) {
    next(error);
  }
};

export const updateEmployeeProfile = async (req, res, next) => {
  try {
    // Ensure user is authenticated
    if (!req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract employee ID from request body
    const { employeeId, firstName, lastName, email, department, mobile, staffID, userAccountId } = req.body;

    // Validate required fields
    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required in the request body." });
    }

    if (!userAccountId) {
      return res.status(400).json({ message: "userAccountId is required" });
    }

    // Find the employee profile by ID
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee profile not found" });
    }

    // Update fields from the request body
    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.department = department || employee.department;
    employee.mobile = mobile || employee.mobile;
    employee.staffID = staffID || employee.staffID;
    employee.userAccountId = userAccountId; // Always update userAccountId

    // Update modifiedBy field
    employee.modifiedBy = req.user.userId; // Track who modified it

    // Save the updated employee profile
    await employee.save();

    res.status(200).json({ message: "Employee profile updated successfully", employee });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    // Extract employee ID from request body
    const { employeeId } = req.body;

    // Validate required field
    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required in the request body." });
    }

    // Find the employee by ID
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Return the employee profile
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};



export const getUserWithLeaveDetails = async (req, res, next) => {
  try {
    const { userAccountId } = req.body; // Get userAccountId from request body

    if (!userAccountId) {
      return res.status(400).json({ message: "User Account ID is required in the request body." });
    }

    // Find the employee using the userAccountId
    const employee = await EmployeeModel.findOne({ userAccountId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Fetch leave requests for the employee
    const leaveRequests = await LeaveModel.find({ employeeId: employee._id });

    // Fetch leave balance for the employee (for the current year)
    const leaveBalance = await LeaveBalanceModel.findOne({
      employeeId: employee._id,
      year: new Date().getFullYear(),
    });

    // Construct the response
    res.status(200).json({
      userAccountId,
      employee: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      },
      leaveRequests: leaveRequests || [],
      leaveBalance: leaveBalance || { message: "No leave balance found" },
    });
  } catch (error) {
    next(error);
  }
};









