import mongoose, {model, Schema, Types} from "mongoose";
import {toJSON} from "@reis/mongoose-to-json";

const employeeSchema = new Schema({
    firstName: {type: String},
    lastName: {type:String},
    email: {type:String },
    department:{type:String},
    mobile:{type:String },
    staffID: {type:String},
    jobTitle: {type:String},
    //leaves: [{ type: Types.ObjectId, ref: "LeaveRequest" }],
    leaveBalanceId:{type:Types.ObjectId, ref:'LeaveBalances'},
    userAccountId:{type:Types.ObjectId, ref:'UserAccounts'},
    createdDate: {type:Date, default:Date.now },
    modifiedAt: {type:Date, default: Date.now },
    createdBy:{type:Types.ObjectId, ref:'UserAccounts'},
    modifiedBy:{type:Types.ObjectId, ref:'UserAccounts'},
    deletedAt:{type:Date, default:null}

}
)

employeeSchema.plugin(toJSON);


// Middleware to update deletedAt instead of removing
employeeSchema.pre("remove", function (next) {
    this.deletedAt = new Date();
    this.save();
    next();
  });
export const EmployeeModel = model("Employees", employeeSchema);

