import Joi from "joi";

export const leaveSchema = Joi.object({
    leaveType: Joi.string()
    .valid("Sick Leave", "Annual Leave", "Vacation")
    .required()
    .messages({
        "string.empty": "Leave type is required.",
        "any.only": "Leave type must be one of 'Sick Leave', 'Annual Leave', or 'Vacation'.",
        "any.required": "Leave type is required."
    }),
startDate: Joi.date().required().messages({
    "date.base": "Start date must be a valid date.",
    "any.required": "Start date is required."
}),
endDate: Joi.date()
    .required()
    .greater(Joi.ref('startDate'))
    .messages({
        "date.base": "End date must be a valid date.",
        "date.greater": "End date must be after or equal to the start date.",
        "any.required": "End date is required."
    }),
reason: Joi.string().required().messages({
    "string.empty": "Reason is required.",
    "any.required": "Reason is required."
}),
year: Joi.string().required(),
status: Joi.string()
    .valid("Pending", "Approved", "Rejected")
    .default("Pending"), // Default value
approvedBy: Joi.string().optional(), // Required only if status is "Approved"

})