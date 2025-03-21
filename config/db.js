import mongoose from "mongoose";
import 'dotenv/config'
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

