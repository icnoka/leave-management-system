import { Router } from "express";
import {CreateSubscription, deleteSubscription, getAllSubscriptions, updateSubscription } from "../controllers/subscribeController.js";



const subscribeRouter = Router();

subscribeRouter.post('/subscribe', CreateSubscription);
subscribeRouter.get('/subscribe', getAllSubscriptions);
subscribeRouter.put('/subscribe', updateSubscription);
subscribeRouter.delete('/subscribe', deleteSubscription);


export default subscribeRouter;

