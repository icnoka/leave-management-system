import {model, Schema} from "mongoose"
import { toJSON } from "@reis/mongoose-to-json"

const demoSchema = new Schema({
    name: { type: String},
    email: { type: String },
    phoneNumber: { type: String},
    companyName: { type: String},
    jobTitle: { type: String},
    industry: { type: String},
    dateCreated: { type: Date, default: Date.now },
    deletedAt:{type:Date, default:null}
  });
     
  demoSchema.plugin(toJSON);


  export const DemoModel = model("Demo", demoSchema);


  




