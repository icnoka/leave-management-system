import { EmployeeModel } from "../models/employee.js";
import { UserModel } from "../models/user_account.js";

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


// Update userAccountId if provided
//if (userAccountId) {
  //employee.userAccountId = userAccountId;
//}

    res.status(201).json({ message: "Employee profile created successfully", employee: newEmployee });

  } catch (error) {
    next(error);
  }
};

export const updateEmployeeProfile = async (req, res, next) => {
  try {
    //console.log("Request User:", req.user); // Log user
    //console.log("Employee ID:", req.params.employeeId); // Log employee ID

      // Ensure user is authenticated
      if (!req.user.userId) {
          return res.status(401).json({ message: "Unauthorized" });
      }

      // Extract employee ID from request parameters
      const { employeeId } = req.params;

      // Find the employee profile by ID
      const employee = await EmployeeModel.findById(employeeId);
      if (!employee) {
          return res.status(404).json({ message: "Employee profile not found" });
      }

      // Update fields from the request body
    const { firstName, lastName, email, department, mobile, staffID, userAccountId } = req.body;

    if (!userAccountId) {
      return res.status(400).json({ message: "userAccountId is required" });
  }
  
      // Validate and update the employee profile
      employee.firstName = firstName || employee.firstName;
      employee.lastName = lastName || employee.lastName;
      employee.email = email || employee.email;
      employee.department = department || employee.department;
      employee.mobile = mobile || employee.mobile;
      employee.staffID = staffID || employee.staffID;

      // Update userAccountId if provided
      if (userAccountId) {
        employee.userAccountId = userAccountId;
    }

      // Update createdBy and modifiedBy fields
      employee.modifiedBy = req.user.userId; // Track who modified it
      employee.createdBy = req.user.userId;

      // Save the updated employee profile
      await employee.save();

      res.status(200).json({ message: "Employee profile updated successfully", employee});
  } catch (error) {
      next(error);
  }
};

// Get employee profile by ID
export const getEmployeeById = async (req, res, next) => {
  try {
      const { employeeId } = req.params; 
      //console.log(`Fetching employee with ID: ${id}`);

      // Find the employee by ID
      const employee = await EmployeeModel.findById(employeeId)
      //.populate('userAccountId'); 

      if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
      }

      // Return the employee profile
      res.status(200).json(employee);
  } catch (error) {
      next(error); 
  }
};








