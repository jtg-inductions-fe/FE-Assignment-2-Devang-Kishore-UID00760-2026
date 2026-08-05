import { useState } from 'react';

import { Resolver, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import type { AddRestaurantFormData } from '@types';

import { defaultValues } from './AddRestaurant.defaultValues';
import { addRestaurantSchema } from './AddRestaurant.validation';

export const useAddRestaurantForm = () => {
    const methods = useForm<AddRestaurantFormData>({
        resolver: yupResolver(
            addRestaurantSchema,
        ) as Resolver<AddRestaurantFormData>,
        defaultValues,
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });

    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        setActiveStep((prev) => prev + 1);
    };

    const previousStep = () => {
        setActiveStep((prev) => prev - 1);
    };

    return { methods, activeStep, nextStep, previousStep, setActiveStep };
};
