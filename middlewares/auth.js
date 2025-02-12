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
      req.user = { userId: decoded.userId, role: decoded.role };
     // console.log("Decoded Token:", decoded); // Log the decoded token
      next();
  } catch (error) {
      return res.status(400).json({ message: "Invalid token." });
  }
};

// Middleware to check user role
export const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    };
  };


