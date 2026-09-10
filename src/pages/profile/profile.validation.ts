import * as yup from 'yup';

import { profileValidationFields } from './profile.constants';

export const addressSchema = yup.object({
    street: yup
        .string()
        .trim()
        .required(profileValidationFields.STREET_REQUIRED),
    city: yup.string().trim().required(profileValidationFields.CITY_REQUIRED),
    state: yup.string().trim().required(profileValidationFields.STATE_REQUIRED),
    pincode: yup
        .string()
        .trim()
        .required(profileValidationFields.PINCODE_REQUIRED)
        .matches(/^\d+$/, profileValidationFields.PINCODE_VALIDATION),
});

export const nameSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required(profileValidationFields.NAME_REQUIRED)
        .min(2, profileValidationFields.NAME_MIN_LENGTH)
        .max(50, profileValidationFields.NAME_MAX_LENGTH),
});

export type NameFormData = yup.InferType<typeof nameSchema>;
export type AddressFormData = yup.InferType<typeof addressSchema>;
