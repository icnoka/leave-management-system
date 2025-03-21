import mongoose, { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female"] },
  mobile: { type: String},
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
  },
  address: { type: String },
  profilePic: { type: String }, 
  department: { type: Types.ObjectId, ref: "Department" },
  role: { type: Types.ObjectId, ref: "Role" },
  staffID: { type: String},
  jobTitle: { type: String },
  leaveBalanceId: { type: Types.ObjectId, ref: "LeaveBalance" },
  userAccountId: { type: Types.ObjectId, ref: "UserAccount", required: true },
  createdBy: { type: Types.ObjectId, ref: "UserAccount" },
  modifiedBy: { type: Types.ObjectId, ref: "UserAccount" },
  createdDate: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

employeeSchema.plugin(toJSON);

export const EmployeeModel = model("Employee", employeeSchema);
