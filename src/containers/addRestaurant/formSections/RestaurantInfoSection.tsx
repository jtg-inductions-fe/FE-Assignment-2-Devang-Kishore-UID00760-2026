import { Controller, useFormContext } from 'react-hook-form';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomSelect } from '@components/customSelect';
import { ImagePreview } from '@components/imagePreview';
import { TextField } from '@components/textField';
import { TimeField } from '@components/timeField';
import type { AddRestaurantFormData } from '@types';

const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const RestaurantInfoSection = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<AddRestaurantFormData>();

    return (
        <Grid container spacing={4}>
            <Grid size={12}>
                <Typography variant="h5">
                    Basic Restaurant Information
                </Typography>
            </Grid>
            <Grid size={6}>
                <Controller
                    name="logo"
                    control={control}
                    render={({ field }) =>
                        field.value ? (
                            <ImagePreview
                                src={field.value}
                                alt="Restaurant logo"
                                onRemove={() => field.onChange('')}
                            />
                        ) : (
                            <TextField
                                {...field}
                                label="Logo URL "
                                fullWidth
                                error={!!errors.logo}
                                helperText={errors.logo?.message}
                            />
                        )
                    }
                />
            </Grid>
            <Grid size={6}>
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) =>
                        field.value ? (
                            <ImagePreview
                                src={field.value}
                                alt="Restaurant banner image"
                                onRemove={() => field.onChange('')}
                            />
                        ) : (
                            <TextField
                                {...field}
                                label="Image URL"
                                fullWidth
                                error={!!errors.image}
                                helperText={errors.image?.message}
                            />
                        )
                    }
                />
            </Grid>
            <Grid size={6}>
                <Controller
                    name="fssaiCertificateId"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="FSSAI Id"
                            fullWidth
                            error={!!errors.fssaiCertificateId}
                            helperText={errors.fssaiCertificateId?.message}
                            required
                        />
                    )}
                />
            </Grid>
            <Grid size={6}>
                <Controller
                    name="gstNumber"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="GST Number"
                            fullWidth
                            error={!!errors.gstNumber}
                            helperText={errors.gstNumber?.message}
                            required
                        />
                    )}
                />
            </Grid>
            <Grid container spacing={4}>
                <Typography variant="h5">Address</Typography>
                <Grid size={12}>
                    <Controller
                        name="address.street"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street "
                                fullWidth
                                error={!!errors.address?.street}
                                helperText={errors.address?.street?.message}
                                required
                            />
                        )}
                    />
                </Grid>

                <Grid size={4}>
                    <Controller
                        name="address.city"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="City"
                                fullWidth
                                error={!!errors.address?.city}
                                helperText={errors.address?.city?.message}
                                required
                            />
                        )}
                    />
                </Grid>
                <Grid size={4}>
                    <Controller
                        name="address.state"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="State"
                                fullWidth
                                error={!!errors.address?.state}
                                helperText={errors.address?.state?.message}
                                required
                            />
                        )}
                    />
                </Grid>
                <Grid size={4}>
                    <Controller
                        name="address.pincode"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Pincode "
                                fullWidth
                                error={!!errors.address?.pincode}
                                helperText={errors.address?.pincode?.message}
                                required
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid size={12}>
                <Typography variant="h5">Restaurant Hours</Typography>
            </Grid>
            <Grid container spacing={8} size={12}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="openingTime"
                        control={control}
                        render={({ field }) => (
                            <Grid>
                                <Typography variant="body1">
                                    Opening Time *
                                </Typography>
                                <TimeField
                                    {...field}
                                    fullWidth
                                    error={!!errors.openingTime}
                                    helperText={errors.openingTime?.message}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
                <Grid
                    display={{ xs: 'none', md: 'flex' }}
                    justifyContent="center"
                    alignItems="center"
                    size={2}
                >
                    <ArrowForwardIcon color="secondary" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="closingTime"
                        control={control}
                        render={({ field }) => (
                            <Grid>
                                <Typography variant="body1">
                                    Closing Time *
                                </Typography>
                                <TimeField
                                    {...field}
                                    fullWidth
                                    error={!!errors.closingTime}
                                    helperText={errors.closingTime?.message}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
            </Grid>

            <Grid size={12}>
                <Controller
                    name="workingDays"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            {...field}
                            multiple
                            label="Working Days *"
                            error={!!errors.workingDays}
                            helperText={errors.workingDays?.message}
                            MenuProps={{
                                anchorOrigin: {
                                    horizontal: 'left',
                                    vertical: 'top',
                                },
                                transformOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                            }}
                        >
                            {DAYS.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    )}
                />
            </Grid>
        </Grid>
    );
};
