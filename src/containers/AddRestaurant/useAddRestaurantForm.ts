import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { defaultValues } from './addRestaurant.defaultValues';
import { AddRestaurantFormData } from './AddRestaurant.types';
import { addRestaurantSchema } from './addRestaurant.validations';

export const useAddRestaurantForm = () => {
    const methods = useForm<AddRestaurantFormData>({
        resolver: yupResolver(addRestaurantSchema),
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
