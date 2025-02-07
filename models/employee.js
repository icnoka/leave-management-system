import mongoose, {model, Schema, Types} from "mongoose";
import {toJSON} from "@reis/mongoose-to-json";

const employeeSchema = new Schema({
    FirstName: {type: String, required: true},
    lastName: {type:String, required: true},
    email: {type:String, required: true },
    department:{type:String, required: true },
    mobile:{type:String, required: true },
    staffID: {type:String, required: true },
    createdDate: {type:Date, default:Date.now },
    modifiedAt: {type:Date, default: Date.now },
    createdBy:{type:Types.ObjectId, ref:'Employee'},
    modifiedBy:{type:Types.ObjectId, ref:'Employee'}

}, {
    timestamps:true
})

employeeSchema.plugin(toJSON);
export const EmployeeModel = model("Employee", employeeSchema);

