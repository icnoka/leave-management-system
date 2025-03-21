import { Router } from "express";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/departmentController.js";




const departmentRouter = Router();

departmentRouter.post('/department', createDepartment);
departmentRouter.get('/department', getDepartments);
departmentRouter.put('/department', updateDepartment);
departmentRouter.delete('/department', deleteDepartment);

export default departmentRouter;

