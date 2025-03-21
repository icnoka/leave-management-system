import jwt from "jsonwebtoken";
import { UserRoleModel } from "../models/user_role.js";


// Middleware to check authentication
export const isAuthenticated = (req, res, next) => {
  try {
      const authHeader = req.header("Authorization");
      if (!authHeader) {
          return res.status(401).json({ message: "Access denied. No token provided." });
      }

      const token = authHeader.split(" ")[1]; // Extract token from the bearer
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = { userId: decoded.userId };
    
      next();
  } catch (error) {
      return res.status(400).json({ message: "Invalid token." });
  }
};


export const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
      try {
        const userRole = req.user.role; // Extracted from JWT middleware
  
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: "Access denied. You do not have permission." });
        }
  
        next();
      } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
  };
  

