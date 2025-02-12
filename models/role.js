import {model, Schema, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const roleSchema = new Schema({
    roleName: { type: String,  required: true,  lowercase:true},
    description: { type: String },
    isActive: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now }
  }, {
    timestamps: true
  });
     
  roleSchema.plugin(toJSON);
  export const RoleModel = model("Role", roleSchema);