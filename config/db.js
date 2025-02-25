import mongoose from "mongoose";
import 'dotenv/config'
import { RoleModel } from "../models/role.js";
import sql from "mssql";
const mongoUri = process.env.MONGO_URL 

export const dbConnection = async ()=>{
  await mongoose.connect(mongoUri)
   
try {
console.log('Database is connected successfully')
} catch (error) {
    console.log(error)
}
}

//  const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_HOST,
//   database:process.env.DB_NAME,
//   options:{
//           trustServerCertificate:true,
//           trustedConnection: false,
//           enableArithAbort: true,
//           instanceName: "SQLEXPRESS",       
//   },
//   port : process.env.PORT

// }
// export const dbConnection = async () => {
//   await sql.connect(config);
//     try {
//     console.log("Database connected successfully!"); // Log success message
//   } catch (error) {
//     console.error("Database connection failed:", error.message); // Log error if connection fails
//   }
// };



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
