import {Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const leaveSchema = new Schema({
    employee: {type: Types.ObjectId, ref: "Employee"},
    leaveType: {type:String, enum:["Sick Leave", "Annual Leave", "Vacation"], required:true},
    startDate: {type:Date, required: true},
    endDate: {type:Date, required:true, validator: function (value) {return value >= this.startDate}},
    reason: {type:String, required:true},
    status: {type:String, enum: ["Pending", "Approved", "Rejected"], default: "Pending"},
    createdDate: {type:Date, default:Date.now },
    modifiedAt: {type:Date, default: Date.now },
    createdBy:{type:Types.ObjectId, ref:'Employee'},
    modifiedBy:{type:Types.ObjectId, ref:'Employee'}

}, {
    timestamps:true
})

leaveSchema.plugin(toJSON);
export const LeaveModel = model("LeaveRequest", leaveSchema);

