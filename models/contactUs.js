import {model, Schema} from "mongoose"
import { toJSON } from "@reis/mongoose-to-json"

const contactSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String },
    email: { type: String},
    phoneNumber: { type: String},
    message: { type: String},
    dateCreated: { type: Date, default: Date.now },
    deletedAt:{type:Date, default:null}
  });
     
  contactSchema.plugin(toJSON);


  export const ContactModel = model("Contact Us", contactSchema);

  




 


  




