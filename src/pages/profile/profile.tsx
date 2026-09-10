import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog';
import { TextField } from '@components/textField';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import {
    fetchCurrentUser,
    logoutCurrentUser,
} from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import {
    addAddress,
    clearProfileError,
    deleteAddress,
    deleteProfile,
    editAddress,
    fetchAddresses,
    updateUser,
} from '@store/slices/profile/profileSlice';
import { AddressData, SnackbarTheme } from '@types';

import { PROFILE_TEXT } from './profile.constants';
import {
    AddressActions,
    AddressContainer,
    LoaderContainer,
    NameContainer,
    ProfileCard,
    ProfileCardContent,
    ProfileContainer,
    ProfileHeader,
} from './profile.styles';
import {
    AddressFormData,
    addressSchema,
    NameFormData,
    nameSchema,
} from './profile.validation';

const Profile = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);

    const { addresses, loading } = useAppSelector((state) => state.profile);

    const [isEditingName, setIsEditingName] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(
        null,
    );

    const [confirmDelete, setConfirmDelete] = useState<
        { type: 'address'; id: string } | { type: 'profile' } | null
    >(null);

    const navigate = useNavigate();
    const {
        control: nameControl,
        handleSubmit: handleNameSubmit,
        reset: resetNameForm,
    } = useForm<NameFormData>({
        resolver: yupResolver(nameSchema),
        defaultValues: {
            name: user?.full_name ?? '',
        },
    });

    const {
        control: addressControl,
        handleSubmit: handleAddressSubmit,
        reset: resetAddressForm,
    } = useForm<AddressFormData>({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            street: '',
            city: '',
            state: '',
            pincode: '',
        },
    });

    useEffect(() => {
        if (user) {
            void dispatch(fetchAddresses());
        }
    }, [dispatch, user]);

    useEffect(
        () => () => {
            dispatch(clearProfileError());
        },
        [dispatch],
    );

    const handleEditName = () => {
        resetNameForm({
            name: user?.full_name ?? '',
        });

        setIsEditingName(true);
    };

    const handleCancelNameEdit = () => {
        resetNameForm({
            name: user?.full_name ?? '',
        });

        setIsEditingName(false);
    };

    const onNameSubmit = async (data: NameFormData) => {
        try {
            await dispatch(updateUser(data.name)).unwrap();
            await dispatch(fetchCurrentUser()).unwrap();

            setIsEditingName(false);

            dispatch(
                showSnackbar({
                    message: PROFILE_TEXT.nameUpdated,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
        } catch {
            dispatch(
                showSnackbar({
                    message: PROFILE_TEXT.updateNameError,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const handleAddAddress = () => {
        setEditingAddressId(null);

        resetAddressForm({
            street: '',
            city: '',
            state: '',
            pincode: '',
        });

        setShowAddressForm(true);
    };

    const handleEditAddress = (address: AddressData) => {
        setEditingAddressId(address.id);

        resetAddressForm({
            street: address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
        });

        setShowAddressForm(true);
    };

    const handleCancelAddress = () => {
        setShowAddressForm(false);
        setEditingAddressId(null);

        resetAddressForm({
            street: '',
            city: '',
            state: '',
            pincode: '',
        });
    };

    const onAddressSubmit = async (data: AddressFormData) => {
        try {
            if (editingAddressId) {
                await dispatch(
                    editAddress({
                        addressId: editingAddressId,
                        address: data,
                    }),
                ).unwrap();

                await dispatch(fetchAddresses()).unwrap();

                dispatch(
                    showSnackbar({
                        message: PROFILE_TEXT.addressUpdated,
                        severity: SnackbarTheme.SUCCESS,
                    }),
                );
            } else {
                await dispatch(addAddress(data)).unwrap();

                await dispatch(fetchAddresses()).unwrap();

                dispatch(
                    showSnackbar({
                        message: PROFILE_TEXT.addressAdded,
                        severity: SnackbarTheme.SUCCESS,
                    }),
                );
            }

            handleCancelAddress();
        } catch {
            const message = editingAddressId
                ? PROFILE_TEXT.updateAddressError
                : PROFILE_TEXT.createAddressError;

            dispatch(
                showSnackbar({
                    message,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const handleDeleteAddress = (addressId: string) => {
        setConfirmDelete({
            type: 'address',
            id: addressId,
        });
    };

    const handleDeleteProfile = () => {
        setConfirmDelete({
            type: 'profile',
        });
    };

    const handleConfirmDelete = async () => {
        if (!confirmDelete) {
            return;
        }

        try {
            if (confirmDelete.type === 'address') {
                await dispatch(deleteAddress(confirmDelete.id)).unwrap();

                await dispatch(fetchAddresses()).unwrap();

                dispatch(
                    showSnackbar({
                        message: PROFILE_TEXT.addressDeleted,
                        severity: SnackbarTheme.SUCCESS,
                    }),
                );
            } else {
                await dispatch(deleteProfile()).unwrap();
                await dispatch(logoutCurrentUser());
                dispatch(
                    showSnackbar({
                        message: PROFILE_TEXT.profileDeleted,
                        severity: SnackbarTheme.SUCCESS,
                    }),
                );
                await navigate(ROUTES.LOGIN);
            }
        } catch {
            const message =
                confirmDelete.type === 'address'
                    ? PROFILE_TEXT.deleteAddressError
                    : PROFILE_TEXT.deleteProfileError;

            dispatch(
                showSnackbar({
                    message,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        } finally {
            setConfirmDelete(null);
        }
    };

    return (
        <ProfileContainer>
            <ProfileHeader>
                <Typography variant="h4" fontWeight={600}>
                    {PROFILE_TEXT.pageTitle}
                </Typography>

                <Button
                    color="error"
                    variant="contained"
                    onClick={handleDeleteProfile}
                    startIcon={<DeleteIcon />}
                >
                    {PROFILE_TEXT.deleteProfile}
                </Button>
            </ProfileHeader>

            <ProfileCard>
                <ProfileCardContent>
                    <Typography variant="h6">
                        {PROFILE_TEXT.personalInformation}
                    </Typography>

                    {!isEditingName ? (
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {PROFILE_TEXT.name}
                                </Typography>

                                <Typography>{user?.full_name}</Typography>
                            </Box>

                            <IconButton
                                color="primary"
                                onClick={handleEditName}
                                aria-label={PROFILE_TEXT.editName}
                            >
                                <EditIcon />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Box
                            component="form"
                            onSubmit={(event) =>
                                void handleNameSubmit(onNameSubmit)(event)
                            }
                        >
                            <NameContainer>
                                <Controller
                                    name="name"
                                    control={nameControl}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label={PROFILE_TEXT.name}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />

                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        type="submit"
                                        color="primary"
                                        disabled={loading}
                                        aria-label={PROFILE_TEXT.saveName}
                                    >
                                        <SaveIcon />
                                    </IconButton>

                                    <IconButton
                                        type="button"
                                        onClick={handleCancelNameEdit}
                                        aria-label={PROFILE_TEXT.cancelNameEdit}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </NameContainer>
                        </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {PROFILE_TEXT.email}
                        </Typography>

                        <Typography>{user?.email}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {PROFILE_TEXT.balance}
                        </Typography>

                        <Typography>{user?.balance_amount}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {PROFILE_TEXT.role}
                        </Typography>

                        <Typography>{user?.role}</Typography>
                    </Box>
                </ProfileCardContent>
            </ProfileCard>

            <AddressContainer>
                <Typography variant="h5" fontWeight={600}>
                    {PROFILE_TEXT.addresses}
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddAddress}
                    disabled={showAddressForm}
                >
                    {PROFILE_TEXT.addAddress}
                </Button>
            </AddressContainer>

            {showAddressForm && (
                <ProfileCard>
                    <ProfileCardContent>
                        <Typography variant="h6" mb={3}>
                            {editingAddressId
                                ? PROFILE_TEXT.editAddress
                                : PROFILE_TEXT.addNewAddress}
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={(event) =>
                                void handleAddressSubmit(onAddressSubmit)(event)
                            }
                        >
                            <Stack spacing={2}>
                                <Controller
                                    name="street"
                                    control={addressControl}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label={PROFILE_TEXT.streetAddress}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="city"
                                    control={addressControl}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label={PROFILE_TEXT.city}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="state"
                                    control={addressControl}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label={PROFILE_TEXT.state}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="pincode"
                                    control={addressControl}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label={PROFILE_TEXT.pincode}
                                            fullWidth
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />

                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                >
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={handleCancelAddress}
                                    >
                                        {PROFILE_TEXT.cancel}
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress size={22} />
                                        ) : editingAddressId ? (
                                            PROFILE_TEXT.updateAddress
                                        ) : (
                                            PROFILE_TEXT.addAddress
                                        )}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </ProfileCardContent>
                </ProfileCard>
            )}

            {loading && addresses.length === 0 ? (
                <LoaderContainer>
                    <CircularProgress />
                </LoaderContainer>
            ) : addresses.length === 0 ? (
                <Card>
                    <CardContent>
                        <Typography color="text.secondary">
                            {PROFILE_TEXT.noAddresses}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Stack spacing={2}>
                    {addresses.map((address) =>
                        !editingAddressId || editingAddressId != address.id ? (
                            <ProfileCard key={address.id}>
                                <ProfileCardContent>
                                    <Stack spacing={1}>
                                        <Typography>
                                            {address.street}
                                        </Typography>

                                        <Typography>
                                            {address.city}, {address.state}
                                        </Typography>

                                        <Typography>
                                            {address.pincode}
                                        </Typography>

                                        <AddressActions>
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEditAddress(address)
                                                }
                                                aria-label={
                                                    PROFILE_TEXT.editAddress
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteAddress(
                                                        address.id,
                                                    )
                                                }
                                                aria-label={
                                                    PROFILE_TEXT.deleteAddress
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </AddressActions>
                                    </Stack>
                                </ProfileCardContent>
                            </ProfileCard>
                        ) : (
                            ''
                        ),
                    )}
                </Stack>
            )}

            <ConfirmDialog
                open={confirmDelete !== null}
                title={
                    confirmDelete?.type === 'profile'
                        ? PROFILE_TEXT.deleteProfile
                        : PROFILE_TEXT.deleteAddress
                }
                message={
                    confirmDelete?.type === 'profile'
                        ? PROFILE_TEXT.deleteProfileMessage
                        : PROFILE_TEXT.deleteAddressMessage
                }
                confirmLabel={PROFILE_TEXT.delete}
                onCancel={() => setConfirmDelete(null)}
                onConfirm={() => {
                    void handleConfirmDelete();
                }}
            />
        </ProfileContainer>
    );
};

export default Profile;
