import { EmployeeModel } from "../models/employee.js";
//import { UserModel } from "../models/user_account.js";

export const createEmployeeProfile = async (req, res, next) => {
    try {
      const { firstName, lastName, email, department, mobile, staffID } = req.body;
  
      // Create employee profile and link to user
      const newEmployee = await EmployeeModel.create({
        firstName,
        lastName,
        email,
        department,
        mobile,
        staffID,
        createdBy: req.user.userId,  // Get userId from token
        modifiedBy: req.user.userId
      });
  
      res.status(201).json({ message: "Employee profile created successfully", employee: newEmployee });
  
    } catch (error) {
      next(error);
    }
  };
  