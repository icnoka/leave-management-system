import {model, Schema, Types} from "mongoose";
import {toJSON} from "@reis/mongoose-to-json";

const leaveBalanceSchema = new Schema({
    employeeId: {type: Types.ObjectId, ref: "Employees"},
    year:{type: String},
    entitlement: {type:Number, required:true},
    daysAvailable: {type:Number, default: function() { return this.entitlement} },
    daysUsed: {type:Number },
    createdDate: {type:Date, default:Date.now },
    modifiedAt: {type:Date, default: Date.now },
    createdBy:{type:Types.ObjectId, ref:'UserAccounts'},
    modifiedBy:{type:Types.ObjectId, ref:'UserAccounts'},
    deletedAt:{type:Date, default:null}

})

  leaveBalanceSchema.plugin(toJSON);


// Middleware to update deletedAt instead of removing
leaveBalanceSchema.pre("remove", function (next) {
  this.deletedAt = new Date();
  this.save();
  next();
});
  export const LeaveBalanceModel = model("LeaveBalances", leaveBalanceSchema);
  

