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
const address = yup.object({
    street: yup.string().trim().required(authValidationFields.STREET_REQUIRED),
    city: yup.string().trim().required(authValidationFields.CITY_REQUIRED),
    state: yup.string().trim().required(authValidationFields.STATE_REQUIRED),
    pincode: yup
        .string()
        .trim()
        .required(authValidationFields.PINCODE_REQUIRED)
        .matches(/^\d+$/, authValidationFields.PINCODE_VALIDATION),
});

export const loginSchema = yup.object({
    email,
    password,
});

export const signupSchema = yup.object({
    full_name: name,
    password,
    email,
    confirmPassword: yup
        .string()
        .required(authValidationFields.CONFIRM_PASSWORD_REQUIRED)
        .oneOf([yup.ref('password')], authValidationFields.PASSWORD_MISMATCH),
    role: yup.mixed<Role>().oneOf([Role.CUSTOMER, Role.OWNER]).required(),
    address,
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
