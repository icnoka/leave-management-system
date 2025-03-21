import { RoleModel } from "../models/role.js";

export const addRole = async (req, res) => {
    try {
      const { roleName, description } = req.body;
  
      // Check if role already exists
      const existingRole = await RoleModel.findOne({ roleName: roleName.toLowerCase() });
  
      if (existingRole) {
        return res.status(400).json({ message: "Role already exists" });
      }
  
      // Create new role
      const newRole = new RoleModel({
        roleName: roleName.toLowerCase(),
        description: description || `${roleName} role`,
      });
  
      await newRole.save();
      return res.status(201).json({ message: "Role created successfully", role: newRole });
  
    } catch (error) {
      console.error("Error adding role:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const getRoles = async (req, res) => {
    try {
      const { roleId, roleName } = req.query; 
  
      let filter = { deletedAt: null };
  
      
      if (roleId) {
        filter._id = roleId;
      }
      if (roleName) {
        filter.roleName = roleName.toLowerCase(); 
      }
  
      const roles = await RoleModel.find(filter);
  
      if (roles.length === 0) {
        return res.status(404).json({ message: "No roles found" });
      }
  
      res.json(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  export const updateRole = async (req, res) => {
    try {
      const { roleName, description , id} = req.body;
  
      const role = await RoleModel.findById(id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
  
      role.roleName = roleName ? roleName.toLowerCase() : role.roleName;
      role.description = description || role.description;
  
      await role.save();
      return res.status(200).json({ message: "Role updated successfully", role });
  
    } catch (error) {
      console.error("Error updating role:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const deleteRole = async (req, res) => {
    try {
      const { id } = req.body;
  
      const role = await RoleModel.findById(id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
  
      role.deletedAt = new Date(); // Mark as deleted
      await role.save();
  
      return res.status(200).json({ message: "Role deleted successfully" });
  
    } catch (error) {
      console.error("Error deleting role:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  