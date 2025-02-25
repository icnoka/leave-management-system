import {Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const leaveSchema = new Schema({
    employeeId: { type: Types.ObjectId, ref: "Employees", required: true },
    leaveType: { type: String, enum: ["Sick", "Annual", "Bereavement", "Maternity", "Paternity", "Personal", "Disability"], required: true },
    daysRequested: {type: Number},
    startDate: { type: Date, required: true },
    endDate: { 
        type: Date, required:true, 
        validate: {
            validator: function(value) {
                return value >= this.startDate;
            },
            message: "End date must be after or equal to the start date."
        }
    },
    reason: { type: String, required: true },
    year:{type:String},
    standInPersonId:{type: Types.ObjectId, ref: "UserAccounts"},
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    lineManagerId: { type: Types.ObjectId, ref: "UserAccounts" }, // Line manager's approval 
    isLinemanagerApproved:{type: Boolean, default: false},
    lineManagerApprovedDate: { type: Date },
    lineManagerRejectedDate: { type: Date },
    hrManagerId: { type: Types.ObjectId, ref: "UserAccounts" }, // Hr manager's approval 
    isHrManagerApproved:{type: Boolean, default: false},
    hrManagerApprovedDate: { type: Date },
    hrManagerRejectedDate: { type: Date },
    comments: { type: String, default: null },
    createdDate: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    createdBy: { type: Types.ObjectId, ref: "UserAccounts"}, 
    modifiedBy: { type: Types.ObjectId, ref: "UserAccounts" },
    deletedAt:{type:Date, default:null}
    
}
  
);

// Pre-save middleware to calculate endDate based on startDate and daysRequested
//leaveSchema.pre('save', function(next) {
    // Check if both daysRequested and startDate are provided
   // if (this.daysRequested && this.startDate) {
        //const endDate = new Date(this.startDate);
        //endDate.setDate(endDate.getDate() + this.daysRequested - 1); // Add daysRequested
        //this.endDate = endDate; // Set the calculated endDate
    //}
    //next(); // Proceed to save the document
//});


leaveSchema.plugin(toJSON);


// Middleware to update deletedAt instead of removing
leaveSchema.pre("remove", function (next) {
    this.deletedAt = new Date();
    this.save();
    next();
  });
export const LeaveModel = model("LeaveRequests", leaveSchema);

