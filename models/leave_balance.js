import {model, Schema, Types} from "mongoose";
import {toJSON} from "@reis/mongoose-to-json";

const leaveBalanceSchema = new Schema({
    employeeId: {type: Types.ObjectId, ref: "Employee"},
    year:{type: String},
    entitlement: {type:Number, required:true},
    daysAvailable: {type:Number, default: function() { return this.entitlement} },
    daysUsed: {type:Number },
    createdDate: {type:Date, default:Date.now },
    modifiedAt: {type:Date, default: Date.now },
    createdBy:{type:Types.ObjectId, ref:'UserAccount'},
    modifiedBy:{type:Types.ObjectId, ref:'UserAccount'}

})

  leaveBalanceSchema.plugin(toJSON);
  export const LeaveBalanceModel = model("LeaveBalance", leaveBalanceSchema);
  

