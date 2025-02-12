import express from "express";
import { dbConnection } from "./config/db.js";
import mongoose from "mongoose";
import userRouter from "./routes/user_route.js";
import definedRoles from "./config/db.js";
import employeeRouter from "./routes/employee_route.js";
import leaveRouter from "./routes/leave_route.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import cors from "cors";
import leaveBalanceRouter from "./routes/leaveBalance_route.js";

dbConnection().then(() => {
    definedRoles(); // Ensure roles exist before handling requests
  });
  ;
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: [
      "auth",
      "Employee",
      "LeaveRequests",
      "LeaveBalance"
      
    ],
    mongooseModels: mongoose.modelNames(),
  });
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));


app.use("/api/auth",  userRouter);
app.use("/api",  employeeRouter);
app.use("/api",  leaveRouter);
app.use("/api", leaveBalanceRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

