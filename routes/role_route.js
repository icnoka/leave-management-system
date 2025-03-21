import { Router } from "express";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/roleController.js";



const roleRouter = Router();

roleRouter.post('/role', addRole);
roleRouter.get('/role', getRoles);
roleRouter.put('/role', updateRole);
roleRouter.delete('/role', deleteRole);

export default roleRouter;

