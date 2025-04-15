import express from "express";
import "dotenv/config";
import {dbConnection} from "./config/db.js";
import mongoose from "mongoose";
import userRouter from "./routes/user_route.js";
import employeeRouter from "./routes/employee_route.js";
import leaveRouter from "./routes/leave_route.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import definedRoles from "./config/db.js";
import cors from "cors";
import leaveBalanceRouter from "./routes/leaveBalance_route.js";
import passwordRouter from "./routes/resetPassword_route.js";
import roleRouter from "./routes/role_route.js";
import departmentRouter from "./routes/department_route.js";
import demoRouter from "./routes/demo_route.js";
import subscribeRouter from "./routes/subscribe_route.js";
import contactUsRouter from "./routes/contactUs_route.js";


dbConnection().then(() => {
  definedRoles(); // Ensure roles exist before handling requests
});


  
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: [
      "auth",
      "Staff",
      "LeaveRequest",
      "leaveBalance",
      "Role",
      "Department",
      "Demo",
      "Subscribe",
      "ContactUs"
      
    ],
    mongooseModels: mongoose.modelNames(),
  });
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));

app.use("/api/auth",  userRouter);
app.use("/api/auth", passwordRouter);
app.use("/api",  employeeRouter);
app.use("/api",  leaveRouter);
app.use("/api", leaveBalanceRouter);
app.use("/api", roleRouter);
app.use("/api", departmentRouter);
app.use("/api", demoRouter);
app.use("/api", subscribeRouter);
app.use("/api", contactUsRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


let port = process.env.PORT || 2001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

