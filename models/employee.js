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
    leaveBalanceId:{type:Types.ObjectId, ref:'LeaveBalance'},
    createdDate: {type:Date, default:Date.now },
    modifiedAt: {type:Date, default: Date.now },
    userAccountId:{type:Types.ObjectId, ref:'UserAccount'},
    createdBy:{type:Types.ObjectId, ref:'UserAccount'},
    modifiedBy:{type:Types.ObjectId, ref:'UserAccount'}

}
)

employeeSchema.plugin(toJSON);
export const EmployeeModel = model("Employee", employeeSchema);

