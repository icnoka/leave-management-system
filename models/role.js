import {model, Schema, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const roleSchema = new Schema({
    roleName: { type: String,  required: true,  lowercase:true},
    description: { type: String },
    isActive: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    deletedAt:{type:Date, default:null}
  });
     
  roleSchema.plugin(toJSON);


// Middleware to update deletedAt instead of removing
roleSchema.pre("remove", function (next) {
  this.deletedAt = new Date();
  this.save();
  next();
});

  export const RoleModel = model("Roles", roleSchema);