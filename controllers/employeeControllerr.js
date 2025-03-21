import { EmployeeModel } from "../models/employee.js";
import { LeaveModel } from "../models/leave_request.js";
import { LeaveBalanceModel } from "../models/leave_balance.js";
import mongoose from "mongoose";

export const createEmployeeProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, department, mobile, staffID, jobTitle, role,address, maritalStatus, gender, userAccountId } = req.body;

    if (!userAccountId) {
      return res.status(400).json({ message: "userAccountId is required" });
    }

    const userId = req.user.userId; 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
// Convert role and department into ObjectId 
const roleId = mongoose.isValidObjectId(role) ? role : null;
const departmentId = mongoose.isValidObjectId(department) ? department : null;



    const newEmployee = await EmployeeModel.create({
      firstName,
      lastName,
      email,
      department: departmentId, 
      mobile,
      staffID,
      jobTitle,
      role: roleId, 
      address,
      gender,
      maritalStatus,
      userAccountId,
      createdBy: userId,
      modifiedBy: userId
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
    const { employeeId, firstName, lastName, email, department, mobile, staffID, gender, address, maritalStatus, role, dateOfBirth, userAccountId } = req.body;

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
    employee.address = address || employee.address;
    employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
    employee.gender = gender || employee.gender;
    employee.maritalStatus = maritalStatus || employee.maritalStatus;
    employee.role = role || employee.role;
    employee.userAccountId = userAccountId; 

    // Update modifiedBy field
    employee.modifiedBy = req.user.userId; 

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

    // Find the employee by ID and populate department and role details
    const employee = await EmployeeModel.findById(employeeId)
    .populate({ path: "department", select: "departmentName -_id" })
    .populate({ path: "role", select: "roleName -_id" })
    .lean();
  

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
// Modify the response to show only the department and role names
employee.department = employee.department?.departmentName || null;
employee.role = employee.role?.roleName || null;
    // Return the employee profile
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};


export const getEmployees = async (req, res, next) => {
  try {
    // Extract filters from query parameters
    const { firstName, lastName, staffId, dateOfBirth, page = 1, limit = 10 } = req.query;

    let filter = {};

    // Apply filters if provided
    if (firstName) {
      
    filter.firstName = { $regex: firstName, $options: "i" };
    }
    
    // Apply filters if provided
    if (lastName) {
      filter.lastName = { $regex: lastName, $options: "i" };
    } 
    
    if (staffId) {
      filter.staffId = staffId; 
    }
    if (dateOfBirth) {
      filter.dateOfBirth = dateOfBirth; 
    }

    // Query the database with the filter
    const employees = await EmployeeModel.find(filter)
      .skip((page - 1) * limit) // Apply pagination
      .limit(parseInt(limit)); 

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }

    // Return filtered employees
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};




export const getUserWithLeaveDetails = async (req, res, next) => {
  try {
    const { userAccountId } = req.body; 

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









