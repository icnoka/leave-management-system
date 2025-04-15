import { Router } from "express";
import { createContactUs, deleteContact, getAllContacts, updateContact } from "../controllers/contactUsController.js";


const contactUsRouter = Router();

contactUsRouter.post('/contactUs', createContactUs);
contactUsRouter.get('/contactUs', getAllContacts);
contactUsRouter.put('/contactUs', updateContact);
contactUsRouter.delete('/contactUs', deleteContact);


export default contactUsRouter;

