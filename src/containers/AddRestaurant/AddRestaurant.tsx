import { useState } from 'react';

import { FieldPath, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@components/common/button';
import { ConfirmDialog } from '@components/common/confirmationDialog/ConfirmationDialog';
import { Logo } from '@components/common/logo';
import { CustomStepper } from '@components/common/strapper/CustomStepper';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { showSnackbar } from '@store/slices/feedBackSlice';
import { createMenuEntry } from '@store/slices/menuSlice';
import { saveRestaurant } from '@store/slices/restaurantSlice';
import { AddRestaurantFormData } from '@types';

import {
    ActionWrapper,
    AddRestaurantContainer,
    AddRestaurantHeader,
    FormWrapper,
    RestaurantForm,
    StyledPaper,
} from './AddRestaurant.styled';
import { MenuSection } from './fromSections/MenuSection';
import { RestaurantInfoSection } from './fromSections/RestaurantInfoSection';
import { RestaurantSection } from './fromSections/RestaurantSection';
import { useAddRestaurantForm } from './useAddRestaurantForm';
import { ROUTES } from '../../constants';

const STEPS = [RestaurantSection, RestaurantInfoSection, MenuSection];
const STEPS_TITLES = ['Restaurant', 'Restaurant Info', 'Menu'];
const STEP_FIELDS: FieldPath<AddRestaurantFormData>[][] = [
    ['name', 'email', 'description', 'contactNumber', 'category', 'cuisines'],
    [
        'logo',
        'image',
        'fssaiCertificateId',
        'gstNumber',
        'openingTime',
        'closingTime',
        'isOpen',
        'workingDays',
        'address.street',
        'address.city',
        'address.state',
        'address.pincode',
    ],
    ['menu'],
];

export const AddRestaurant = () => {
    const { methods, activeStep, nextStep, previousStep } =
        useAddRestaurantForm();

    const ActiveStep = STEPS[activeStep];
    const { trigger } = methods;
    const dispatch = UseAppDispatch();
    const { user } = UseAppSelector((store) => store.auth);
    const { loading } = UseAppSelector((state) => state.restaurants);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleCancel = () => {
        setIsOpen((state) => !state);
    };

    const onSubmit = async (data: AddRestaurantFormData) => {
        try {
            const restaurant = await dispatch(
                saveRestaurant({
                    ownerId: user!.id,
                    name: data.name,
                    description: data.description,
                    contactNumber: data.contactNumber,
                    email: data.email,
                    fssaiCertificateId: data.fssaiCertificateId,
                    gstNumber: data.gstNumber,
                    cuisines: data.cuisines,
                    category: data.category,
                    image: data.image,
                    logo: data.logo,
                    address: data.address,
                    isOpen: data.isOpen,
                    openingTime: data.openingTime,
                    closingTime: data.closingTime,
                    workingDays: data.workingDays,
                }),
            ).unwrap();

            await Promise.all(
                data.menu.map((item) =>
                    dispatch(
                        createMenuEntry({
                            restaurantID: restaurant.id,
                            name: item.name,
                            description: item.description,
                            price: item.price,
                            category: item.category,
                            image: item.image,
                            cuisine: item.cuisine,
                            stock: item.stock,
                        }),
                    ).unwrap(),
                ),
            );
            dispatch(
                showSnackbar({
                    message: 'Item Added successful.',
                    severity: 'success',
                }),
            );
            await navigate(ROUTES.DISCOVERY, { replace: true });
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: 'error',
                }),
            );
        }
    };
    const handleNext = async () => {
        if (!(activeStep === STEPS.length - 1)) {
            const isValid = await trigger(STEP_FIELDS[activeStep]);
            if (!isValid) return;
            nextStep();
        } else {
            await methods.handleSubmit(onSubmit)();
        }
    };

    return (
        <AddRestaurantContainer maxWidth="lg">
            <AddRestaurantHeader>
                <Link to="/">
                    <Logo />
                </Link>
            </AddRestaurantHeader>
            <StyledPaper elevation={2}>
                <Typography variant="h3" mb={4}>
                    ADD NEW RESTAURANT
                </Typography>
                <Typography variant="body1" mb={4} color="secondary.main">
                    Add your restaurant and start serving customers through our
                    platform
                </Typography>
                <FormProvider {...methods}>
                    <RestaurantForm
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <CustomStepper
                            activeStep={activeStep}
                            steps={STEPS_TITLES}
                        />
                        <FormWrapper>
                            <ActiveStep />
                        </FormWrapper>
                        <ActionWrapper>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={
                                    activeStep === 0
                                        ? handleCancel
                                        : previousStep
                                }
                            >
                                {activeStep === 0 ? 'Cancel' : 'Back'}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => {
                                    void handleNext;
                                }}
                                loading={loading}
                            >
                                {activeStep === STEPS.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </Button>
                        </ActionWrapper>
                    </RestaurantForm>
                </FormProvider>
            </StyledPaper>
            <ConfirmDialog
                open={isOpen}
                title={'Cancel Adding New Restaurant.'}
                message={'Do you want to cancel adding new restaurant?'}
                confirmLabel={'Confirm'}
                onCancel={() => setIsOpen((state) => !state)}
                onConfirm={() =>
                    void (async () => {
                        await navigate(ROUTES.DISCOVERY);
                        setIsOpen((state) => !state);
                    })
                }
            />
        </AddRestaurantContainer>
    );
};
