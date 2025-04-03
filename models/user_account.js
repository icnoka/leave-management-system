import {model, Schema, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema ({
  email: { type: String, required: true, unique: true, lowercase:true},
  password: { type: String, required: true },
  role:{type: Types.ObjectId, ref: "Role"},
  resetToken: { type: String },
  resetTokenExpiresAt: { type: Date },
  isLocked: { type: Boolean, default: false }, 
  lockedUntil: { type: Date }, 
  dateCreated: { type: Date, default: Date.now },
  deletedAt:{type:Date, default:null}
 
}, {
    timestamps:true
})

userSchema.plugin(toJSON);
export const UserModel = model("UserAccount", userSchema);
