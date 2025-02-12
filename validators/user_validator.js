import Joi from "joi";

export const userSchema = Joi.object({
 username: Joi.string().lowercase().required(),
 role: Joi.string().lowercase(),

  password: Joi.string()
    .min(8)
    .pattern(/[0-9]/)
    .message(
      "Password must be at least 8 characters long and include at least one number."
    )
    .required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Password must be at least 8 characters long.",
    })
    .pattern(/[0-9]/)
    .messages({
      "string.pattern.base": "Password must include at least one number.",
    })
    .required()
    .messages({
      "any.required": "Password is required.",
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})
.with('password', 'confirmedPassword')











