import mongoose from "mongoose";
import { RoleModel } from "../models/role.js";
const mongoUri = process.env.MONGO_URL

export const dbConnection = async ()=>{
    await mongoose.connect(mongoUri)
try {
console.log('Database is connected successfully')
} catch (error) {
    console.log(error)
}
}



const definedRoles = async () => {
  try {
    const roles = ["Employee", "HR Manager", "Line Manager" ].map(role => role.toLowerCase());

    for (const roleName of roles) {
      const existingRole = await RoleModel.findOne({ roleName });
      if (!existingRole) {
        await RoleModel.create({ roleName, description: `${roleName} role` });
        
      }
    }
  } catch (error) {
    console.error(" Error seeding roles:", error);
  }
};

export default definedRoles;
