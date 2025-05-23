import {model, Schema, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userRoleSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "UserAccount", required: true },
    roleId: { type: Types.ObjectId, ref: "Role", required: true },
    dateCreated: { type: Date, default: Date.now },
    deletedAt:{type:Date, default:null}
  });

  userRoleSchema.plugin(toJSON);
  
  export const UserRoleModel = model("UserRole", userRoleSchema);

  