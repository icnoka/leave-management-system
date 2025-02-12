import { LeaveBalanceModel } from "../models/leave_balance.js";
import { EmployeeModel } from "../models/employee.js";

// Create a leave balance
export const createLeaveBalance= async (req, res) => {
    try {
        const { entitlement, year, remainingDays} = req.body;
        // Ensure user is authenticated
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        
            // Check if the user is an employee
           const employee = await EmployeeModel.findOne({ userAccountId: req.user.userId });
        
           if (!employee) {
            console.log(`No employee found for user ID: ${req.user.userId}`);
             return res.status(403).json({ message: "Only employees can submit their leave balance" });
            }

            // Create leave balance
                const leaveBalance = await LeaveBalanceModel.create({
                  employeeId: employee._id,
                  entitlement,
                  remainingDays,
                   year,
                  createdBy: req.user.userId,  // Track who created it
                  modifiedBy: req.user.userId
                });
            
                res.status(201).json({ message: "Leave balance created successfully", leaveBalance});
            
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }}

    // Update a leave balance
export const updateLeaveBalance = async (req, res) => {
    try {
        const { entitlement, remainingDays } = req.body;

        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find the leave balance by ID
        const leaveBalance = await LeaveBalanceModel.findById(req.params.id);

        if (!leaveBalance) {
            return res.status(404).json({ message: "Leave balance not found" });
        }

        // Update fields
        leaveBalance.entitlement = entitlement || leaveBalance.entitlement;
        leaveBalance.remainingDays = remainingDays || leaveBalance.remainingDays;
        leaveBalance.modifiedBy = req.user.userId;
        leaveBalance.modifiedAt = Date.now(); // Update modified date

        await leaveBalance.save();

        res.status(200).json({ message: "Leave balance updated successfully", leaveBalance });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a leave balance
export const deleteLeaveBalance = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find and delete the leave balance by ID
        const leaveBalance = await LeaveBalanceModel.findByIdAndDelete(req.params.id);

        if (!leaveBalance) {
            return res.status(404).json({ message: "Leave balance not found" });
        }

        res.status(200).json({ message: "Leave balance deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get leave balance by employee ID and year
export const getLeaveBalance = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find the leave balance by employee ID and year
        const leaveBalance = await LeaveBalanceModel.findOne({
            employeeId: req.params.employeeId,
            year: req.params.year
        });

        if (!leaveBalance) {
            return res.status(404).json({ message: "Leave balance not found" });
        }

        res.status(200).json(leaveBalance);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

