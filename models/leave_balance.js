import {model, Schema, Types} from "mongoose";
import {toJSON} from "@reis/mongoose-to-json";

const leaveBalanceSchema = new Schema({
    employee: {type: Types.ObjectId, ref: "Employee"},
    entitlement: {type:Number, required:true},
    remainingDays: {type:Number, required: true },
    createdDate: {type:date, default:Date.now },
    modifiedAt: {type:date, default: Date.now },
    createdBy:{type:Types.ObjectId, ref:'Employee'},
    modifiedBy:{type:Types.ObjectId, ref:'Employee'}

}, {timestamps: true})

  leaveBalanceSchema.plugin(toJSON);
  export const LeaveBalanceModel = model("LeaveBalance", leaveBalanceSchema);
  

  //Middleware to update modifiedDate before saving
//leaveBalanceSchema.pre("save", function (next) {
    //this.modifiedDate = Date.now();
    //next();
  //});


