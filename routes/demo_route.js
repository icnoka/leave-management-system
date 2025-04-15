import { Router } from "express";
import { deleteDemo, getAllDemos, Newdemo, updateDemo } from "../controllers/demoController.js";



const demoRouter = Router();

demoRouter.post('/demo', Newdemo);
demoRouter.get('/demo', getAllDemos);
demoRouter.put('/demo', updateDemo);
demoRouter.delete('/demo', deleteDemo);



export default demoRouter;

