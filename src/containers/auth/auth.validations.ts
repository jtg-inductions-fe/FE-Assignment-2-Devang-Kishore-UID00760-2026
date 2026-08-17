import * as yup from 'yup';

import { Role } from '@types';

import { authValidationFields } from './auth.constants';

const email = yup
    .string()
    .trim()
    .email(authValidationFields.EMAIL_VALIDATION)
    .required(authValidationFields.EMAIL_REQUIRED);

const password = yup
    .string()
    .trim()
    .required(authValidationFields.PASSWORD_REQUIRED)
    .min(8, authValidationFields.PASSWORD_MIN_LENGTH)
    .max(32, authValidationFields.PASSWORD_MAX_LENGTH);

const name = yup
    .string()
    .trim()
    .required(authValidationFields.NAME_REQUIRED)
    .min(2, authValidationFields.NAME_MIN_LENGTH)
    .max(50, authValidationFields.NAME_MAX_LENGTH);

export const loginSchema = yup.object({
    email,
    password,
});

export const signupSchema = yup.object({
    name,
    password,
    email,
    confirmPassword: yup
        .string()
        .required(authValidationFields.CONFIRM_PASSWORD_REQUIRED)
        .oneOf([yup.ref('password')], authValidationFields.PASSWORD_MISMATCH),
    role: yup.mixed<Role>().oneOf([Role.CUSTOMER, Role.OWNER]).required(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
