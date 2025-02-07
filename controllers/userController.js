import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_account.js";
import { UserRoleModel } from "../models/user_role.js";
import { RoleModel } from "../models/role.js";

export const signup = async (req, res, next) => {
  try {
    const { username, password, roleName } = req.body;

    // Convert role to lowercase
    const roleLower = roleName.toLowerCase();

      // Validate role
      const validRoles = ["employee", "hr manager"];
      if (!validRoles.includes(roleLower)) {
        return res.status(400).json({ message: "Invalid role" });
      }
  

    // Check if user exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    // Find the role by roleName
    //const role = await RoleModel.findOne({ roleName });
    //if (!role) return res.status(400).json({ message: "Invalid role" });

   // Assign role in UserRoleModel
   const role = await RoleModel.findOne({ roleName: roleLower });
   if (!role) return res.status(400).json({ message: "Role not found in database" });

    const userRole = new UserRoleModel({ userId: newUser._id, roleId: role._id });
   await userRole.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Check if account is locked
    if (user.isLocked && user.lockedUntil > Date.now()) {
      return res.status(403).json({ message: `Account locked until ${user.lockedUntil}` });
    }

    // Verify password
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
    const userRole = await UserRoleModel.findOne({ userId: user._id }).populate("roleId");
    if (!userRole) return res.status(403).json({ message: "No role assigned" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: userRole.roleId.roleName },
      
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
      user: {
        username: user.username,
        role: userRole.roleId.roleName,
      },
    });

  } catch (error) {
    next(error);
  }
};

//Get a user by their username
/**export const getUser = async (req, res, next) => {
  try {
    const username = req.params.username.toLowerCase();

  const options = { sort: { startDate: -1 } }
  const userDetails = await UserModel.findOne({ username }).select("-password")
    .populate({
      path: "appointments",
      options,
    })
    .populate("profile")
    

  return res.status(200).json({ user: userDetails });
  } catch (error) {
  //  next()
  console.log(error)
  }
};/** */

export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
