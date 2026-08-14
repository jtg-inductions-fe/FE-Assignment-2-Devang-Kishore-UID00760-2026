import { useEffect, useState } from 'react';

import { FormProvider, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog';
import { CustomStepper } from '@components/stepper/CustomStepper';
import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import {
    createMenuEntry,
    fetchMenu,
    removeMenuEntry,
} from '@store/slices/menu/menuSlice';
import {
    fetchRestaurantByID,
    saveRestaurant,
    updateRestaurantData,
} from '@store/slices/restaurant/restaurantSlice';
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
    const { replace } = useFieldArray({
        control: methods.control,
        name: 'menu',
    });
    const { id } = useParams();
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

    const isEditMode = !!id;
    const selectedRestaurant = useAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );
    const menuItem = useAppSelector((state) => state.menu.items);
    const onSubmit = async (data: AddRestaurantFormData) => {
        const restaurantData = {
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
        };

        try {
            const restaurant = !isEditMode
                ? await dispatch(saveRestaurant(restaurantData)).unwrap()
                : await dispatch(
                      updateRestaurantData({ id, data: restaurantData }),
                  ).unwrap();

            if (isEditMode) {
                await Promise.all(
                    menuItem.map(async (item) => {
                        await dispatch(removeMenuEntry(item.id)).unwrap();
                    }),
                );
            }

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
                    message: addRestaurantContent.ITEM_ADDED_MESSAGE,
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
        await navigate(ROUTES.DISCOVERY);
        setIsOpen((state) => !state);
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
        if (id && selectedRestaurant?.id === id && menuItem) {
            methods.reset(selectedRestaurant);
            replace(menuItem);
        }
    }, [selectedRestaurant, methods, menuItem, replace, id]);

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
                onConfirm={() => void handleConfirm()}
            />
        </AddRestaurantContainer>
    );
};
