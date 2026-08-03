import * as yup from 'yup';

import { Role } from '@types';

const email = yup
    .string()
    .trim()
    .email('please enter a valid email')
    .required('email is required');

const password = yup
    .string()
    .trim()
    .required('password is required')
    .min(8, 'password must be at least 8 character')
    .max(32, 'password cannot exceed 32 character.');

const name = yup
    .string()
    .trim()
    .required('full name is required')
    .min(2, 'name must be at least 2 characters.')
    .max(50, 'name cannot exceed 50 characters.');

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
        .required('confirm password is required')
        .oneOf([yup.ref('password')], 'password do not match.'),
    role: yup.mixed<Role>().oneOf(['customer', 'owner']).required(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
