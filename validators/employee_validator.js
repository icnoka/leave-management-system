import Joi from "joi";


export const employeeSchema = Joi.object({
firstName: Joi.string().max(255),

lastName: Joi.string().max(255),

email: Joi.string().lowercase().email(),

mobile: Joi.string()
  .pattern(/^0\d{9}$/)
  .message("Invalid Phone Number"),

department: Joi.string(),
staffID: Joi.string()


})