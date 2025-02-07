import express from "express";
import { dbConnection } from "./config/db.js";
import mongoose from "mongoose";
import userRouter from "./routes/user_route.js";
import definedRoles from "./config/db.js";
import employeeRouter from "./routes/employee_route.js";
import leaveRouter from "./routes/leave_route.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import cors from "cors";

dbConnection().then(() => {
    definedRoles(); // Ensure roles exist before handling requests
  });
  ;
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: [
      "auth",
      "Employee"
      
    ],
    mongooseModels: mongoose.modelNames(),
  });
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));


app.use("/api/v1",  userRouter);
app.use("/api/v1",  employeeRouter);
app.use("/api/v1",  leaveRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

