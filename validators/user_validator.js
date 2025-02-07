import Joi from "joi";

export const registerValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  isLocked: { type: Boolean, default: false }, 
  lockedUntil: { type: Date }, 
 confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});


export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string(),
    
});
export const createUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(), 
    role: Joi.string().required().valid('admin', 'manager'),
});

export const updateUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('admin', 'manager'),
});

export const profileValidator = Joi.object({
    
    firstName: Joi.string(),
    lastName: Joi.string(),
    sex: Joi.string(),
    dateOfBirth: Joi.date(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    occupation: Joi.string(),
    address: Joi.string(),
    emergencyContactName: Joi.string(),
    emergencyContactNumber: Joi.string(),
    pastMedicalHistory: Joi.string(),
    familyMedicalHistory: Joi.string(),
    allergies: Joi.string(),
    currentMedications: Joi.string(),
    identificationType: Joi.string(),
    identificationNumber: Joi.string(),
    insuranceProvider: Joi.string(),
    insurancePolicyNumber:Joi.string(),
    identificationDocument: Joi.string(), 
    user: Joi.string()
}
);

export const appointmentValidator = Joi.object({
    
    patient:Joi.string().required(),
    relationship: Joi.string(),
    department: Joi.string().required(),
    doctors: Joi.string().required(),
    reasonForAppointment: Joi.string().required(),
    appointmentDate:Joi.date().required(),
    appointmentTime: Joi.string(),
    status:Joi.string(),
    user: Joi.string()
    
}
);