import jwt from "jsonwebtoken";
import { UserRoleModel } from "../models/user_role.js";


// Middleware to check authentication
export const isAuthenticated = (req, res, next) => {
    //Extract token from headers
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
     //Verify the token to get user and append to request 
    // req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to check user role
export const authorizeRoles = (role) => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: `Access denied. Only ${role}s can perform this action.` });
      }
      next();
    };
  };
  
/**export const authorizeRoles = (...roles) => {
return async (req, res, next) => {
   try {
     const userRole = await UserRoleModel.findOne({ userId: req.user.id }).populate("roleId");

       (!userRole || !roles.includes(userRole.roleId.roleName)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
     res.status(500).json({ message: "Authorization error" });
    }
  };
};
**/


