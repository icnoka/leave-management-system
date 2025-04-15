import mongoose from "mongoose";
import { RoleModel } from "../models/role.js";
import 'dotenv/config'
import sql from "mssql";

const mongoUri = process.env.MONGO_URL;

export const dbConnection = async () => {
  try {
    await mongoose.connect(mongoUri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      tlsAllowInvalidCertificates: true, //Important for self-signed cert
    });

    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

// const mongoUri = process.env.MONGO_URL 

// export const dbConnection = async ()=>{
//   await mongoose.connect(mongoUri)
   
// try {

// console.log('Database is connected successfully')
// } catch (error) {
//     console.log(error)
// }
// }

//  const config = {
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASS,
//   server: process.env.DB_HOST,
//   database:process.env.DB_NAME,
//   options:{
//           trustServerCertificate:true,
//           trustedConnection: false,
//           enableArithAbort: true,
//           instanceName: "SQLEXPRESS",       
//   },
//   port : process.env.PORT


const definedRoles = async () => {
  try {
    const roles = ["Employee", "HR Manager", "Line Manager", "Admin" ].map(role => role.toLowerCase());

    for (const roleName of roles) {
      const existingRole = await RoleModel.findOne({ roleName });
      if (!existingRole) {
        await RoleModel.create({ roleName, description: `${roleName} role` });
        
      }
    }
  } catch (error) {
    console.error(" Error seeding roles:", error);
  }}


export default definedRoles;