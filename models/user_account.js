import {model, Schema, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema ({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isLocked: { type: Boolean, default: false }, 
  lockedUntil: { type: Date }, 
  dateCreated: { type: Date, default: Date.now }
}, {
    timestamps:true
})

userSchema.plugin(toJSON);
export const UserModel = model("UserAccount", userSchema);
