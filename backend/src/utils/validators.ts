import Joi from "joi";

export const signupSchema = Joi.object({
  full_name: Joi.string().min(3).required(),
  employee_id: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).pattern(new RegExp("(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).required(),
  department_id: Joi.number().optional()
});
