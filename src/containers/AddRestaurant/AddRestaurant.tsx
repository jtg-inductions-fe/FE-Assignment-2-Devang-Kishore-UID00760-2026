import { useState } from 'react';

import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog';
import { CustomStepper } from '@components/strapper/CustomStepper';
import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { createMenuEntry } from '@store/slices/menu/menuSlice';
import { saveRestaurant } from '@store/slices/restaurant/restaurantSlice';
import { SnackbarTheme } from '@types';

import { addRestaurantContent } from './addRestaurant.constants';
import { STEP_FIELDS } from './addRestaurant.constants';
import {
    ActionWrapper,
    AddRestaurantContainer,
    FormWrapper,
    RestaurantForm,
    StyledPaper,
} from './AddRestaurant.styles';
import { AddRestaurantFormData } from './AddRestaurant.types';
import { MenuSection } from './formSections/MenuSection';
import { RestaurantInfoSection } from './formSections/RestaurantInfoSection';
import { RestaurantSection } from './formSections/RestaurantSection';
import { useAddRestaurantForm } from './useAddRestaurantForm';
const STEPS = [RestaurantSection, RestaurantInfoSection, MenuSection];
const STEPS_TITLES = ['Restaurant', 'Restaurant Info', 'Menu'];

export const AddRestaurant = () => {
    const { methods, activeStep, nextStep, previousStep } =
        useAddRestaurantForm();

    const ActiveStep = STEPS[activeStep];
    const { trigger } = methods;
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((store) => store.auth);
    const { loading } = useAppSelector((state) => state.restaurants);
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
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
            await navigate(ROUTES.DISCOVERY, { replace: true });
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.ERROR,
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
            <StyledPaper elevation={2}>
                <Typography variant="h3" mb={4}>
                    {addRestaurantContent.RESTAURANT_HEADING}
                </Typography>
                <Typography variant="body1" mb={4} color="secondary.main">
                    {addRestaurantContent.RESTAURANT_SUBHEADING}
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
                                {activeStep === 0
                                    ? `${addRestaurantContent.CANCEL}`
                                    : `${addRestaurantContent.BACK}`}
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => {
                                    void handleNext();
                                }}
                                loading={loading}
                            >
                                {activeStep === STEPS.length - 1
                                    ? `${addRestaurantContent.SUBMIT}`
                                    : `${addRestaurantContent.NEXT}`}
                            </Button>
                        </ActionWrapper>
                    </RestaurantForm>
                </FormProvider>
            </StyledPaper>
            <ConfirmDialog
                open={isOpen}
                title={`${addRestaurantContent.DIALOG_TITLE}`}
                message={`${addRestaurantContent.DIALOG_SUBTITLE}`}
                confirmLabel={`${addRestaurantContent.DIALOG_LABEL}`}
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
