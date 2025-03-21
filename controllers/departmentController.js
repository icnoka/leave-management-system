import { DepartmentModel } from "../models/department.js";
import { RoleModel } from "../models/role.js";

export const createDepartment = async (req, res) => {
    try {
      const { departmentName, description } = req.body;
  
      // Check if department exists
      const existingDepartment = await DepartmentModel.findOne({ departmentName });
      if (existingDepartment) {
        return res.status(400).json({ message: "Department already exists" });
      }
  
      const department = await DepartmentModel.create({ departmentName, description });
  
      res.status(201).json({ message: "Department created successfully", department });
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const getDepartments = async (req, res) => {
    try {
      const departments = await DepartmentModel.find({ deletedAt: null });
      res.json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const updateDepartment = async (req, res) => {
    try {
      const { departmentId, departmentName, description } = req.body;
  
      if (!departmentId) {
        return res.status(400).json({ message: "Department ID is required" });
      }
  
      const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
        departmentId,
        { departmentName, description },
        { new: true, runValidators: true }
      );
  
      if (!updatedDepartment) {
        return res.status(404).json({ message: "Department not found" });
      }
  
      res.json({ message: "Department updated successfully", department: updatedDepartment });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const deleteDepartment = async (req, res) => {
    try {
      const { departmentId } = req.body;
  
      if (!departmentId) {
        return res.status(400).json({ message: "Department ID is required" });
      }
  
      const department = await DepartmentModel.findByIdAndUpdate(
        departmentId,
        { deletedAt: new Date(), isActive: false },
        { new: true }
      );
  
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }
  
      res.json({ message: "Department deleted successfully" });
    } catch (error) {
      console.error("Error deleting department:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  