import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_account.js";
//import { UserRoleModel } from "../models/user_role.js";



export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user (without a role)
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      email: newUser.email,
      userAccountId: newUser._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
// User login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check if account is locked
    if (user.isLocked && user.lockedUntil > Date.now()) {
      return res.status(403).json({ message: `Account locked until ${user.lockedUntil}` });
    }

    // Verify password
    const MAX_ATTEMPTS = 3;
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      if (user.failedAttempts >= MAX_ATTEMPTS) {
        user.isLocked = true;
        user.lockedUntil = new Date(Date.now() + LOCK_TIME);
      }
      await user.save();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Reset failed attempts on successful login
    user.failedAttempts = 0;
    user.isLocked = false;
    await user.save();

    // Fetch user role
    // const userRole = await UserRoleModel.findOne({ userId: user.id }).populate("roleId");
    // if (!userRole) return res.status(403).json({ message: "No role assigned" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id}, 
      
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "3h" }
    );
   

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
      user: {
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};


//function to log a user out
export const logout = () => {
  // Remove the JWT token from local storage or session storage
  localStorage.removeItem('token'); // or sessionStorage.removeItem('token');

   // Show a logout message
   alert("You have been logged out successfully.");
  
  // Redirect to login page 
  window.location.href = '/login';
};
 