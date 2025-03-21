import {model, Schema} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const departmentSchema = new Schema({
    departmentName: { type: String,  required: true,  lowercase:true},
    description: { type: String },
    isActive: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    deletedAt:{type:Date, default:null}
  });
     
  departmentSchema.plugin(toJSON);


  export const DepartmentModel = model("Department", departmentSchema);