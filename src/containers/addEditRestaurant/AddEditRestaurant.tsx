import { useEffect, useState } from 'react';

import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog';
import { CustomStepper } from '@components/stepper/CustomStepper';
import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { fetchMenu } from '@store/slices/menu/menuSlice';
import {
    fetchRestaurantByID,
    saveRestaurant,
    updateRestaurantData,
} from '@store/slices/restaurant/restaurantSlice';
import { SnackbarTheme } from '@types';

import { addRestaurantContent } from './addEditRestaurant.constants';
import { STEP_FIELDS } from './addEditRestaurant.constants';
import {
    ActionWrapper,
    AddRestaurantContainer,
    FormWrapper,
    RestaurantForm,
    StyledPaper,
} from './AddEditRestaurant.styles';
import { AddRestaurantFormData } from './AddEditRestaurant.types';
import { RestaurantInfoSection } from './formSections/RestaurantInfoSection';
import { RestaurantSection } from './formSections/RestaurantSection';
import { useAddEditRestaurantForm } from './useAddEditRestaurantForm';
const STEPS = [RestaurantSection, RestaurantInfoSection];
const STEPS_TITLES = ['Restaurant', 'Restaurant Info'];

export const AddEditRestaurant = () => {
    const { methods, activeStep, nextStep, previousStep } =
        useAddEditRestaurantForm();
    const { id } = useParams();
    const ActiveStep = STEPS[activeStep];
    const { trigger } = methods;
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.restaurants);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleCancel = () => {
        setIsOpen((state) => !state);
    };

    const isEditMode = !!id;

    const selectedRestaurant = useAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );

    const menuItem = useAppSelector((state) => state.menu.items);
    const onSubmit = async (data: AddRestaurantFormData) => {
        const { ...restaurantData } = data;
        try {
            if (!isEditMode) {
                await dispatch(saveRestaurant(restaurantData)).unwrap();
            } else {
                await dispatch(
                    updateRestaurantData({
                        id,
                        data: restaurantData,
                    }),
                ).unwrap();
            }
            dispatch(
                showSnackbar({
                    message: isEditMode
                        ? addRestaurantContent.ITEM_UPDATED_MESSAGE
                        : addRestaurantContent.ITEM_ADDED_MESSAGE,
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

    const handleConfirm = async () => {
        setIsOpen((state) => !state);
        await navigate(ROUTES.DISCOVERY);
    };

    useEffect(() => {
        if (!id) return;

        dispatch(fetchRestaurantByID(id))
            .unwrap()
            .then(async () => {
                await dispatch(fetchMenu({ restaurantId: id })).unwrap();
            })
            .catch(() => {
                dispatch(
                    showSnackbar({
                        message: addRestaurantContent.SNACKBAR_ERROR_MESSAGE,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            });
    }, [id, dispatch]);

    useEffect(() => {
        if (id && selectedRestaurant?.id === id) {
            methods.reset(selectedRestaurant);
        }
    }, [selectedRestaurant, methods, menuItem, id]);

    return (
        <AddRestaurantContainer maxWidth="lg">
            <StyledPaper elevation={2}>
                <Typography variant="h3" mb={4}>
                    {!isEditMode
                        ? addRestaurantContent.RESTAURANT_HEADING
                        : addRestaurantContent.RESTAURANT_EDIT}
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
                                disabled={loading}
                                onClick={
                                    activeStep === 0
                                        ? handleCancel
                                        : previousStep
                                }
                            >
                                {activeStep === 0
                                    ? addRestaurantContent.CANCEL
                                    : addRestaurantContent.BACK}
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
                                    ? addRestaurantContent.SUBMIT
                                    : addRestaurantContent.NEXT}
                            </Button>
                        </ActionWrapper>
                    </RestaurantForm>
                </FormProvider>
            </StyledPaper>
            <ConfirmDialog
                open={isOpen}
                title={
                    !isEditMode
                        ? addRestaurantContent.ADD_RESTAURANT_DIALOG_TITLE
                        : addRestaurantContent.EDIT_RESTAURANT_DIALOG_TITLE
                }
                message={
                    !isEditMode
                        ? addRestaurantContent.ADD_RESTAURANT_DIALOG_SUBTITLE
                        : addRestaurantContent.EDIT_RESTAURANT_DIALOG_SUBTITLE
                }
                confirmLabel={addRestaurantContent.DIALOG_LABEL}
                onCancel={() => setIsOpen((state) => !state)}
                onConfirm={() => void handleConfirm()}
            />
        </AddRestaurantContainer>
    );
};
