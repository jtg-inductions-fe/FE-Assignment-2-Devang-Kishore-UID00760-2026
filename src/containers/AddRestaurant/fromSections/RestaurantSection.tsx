import { Controller, useFormContext } from 'react-hook-form';

import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomSelect } from '@components/common/customSelect';
import { TextField } from '@components/common/textField';
import { UseAppSelector } from '@hooks/storeHooks';
import type { AddRestaurantFormData } from '@types';

const FOOD_TYPES = ['veg', 'nonVeg', 'both'];
const CUISINES = [
    'Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Thai',
    'Japanese',
    'American',
    'Fast Food',
    'Desserts',
    'Beverages',
];

export const RestaurantSection = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<AddRestaurantFormData>();
    const { user } = UseAppSelector((state) => state.auth);
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    label="Owner Name (Read only)"
                    fullWidth
                    value={user?.name}
                    disabled
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Restaurant Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            required
                        />
                    )}
                />
            </Grid>

            <Grid size={12}>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="contactNumber"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Contact Number"
                            fullWidth
                            error={!!errors.contactNumber}
                            helperText={errors.contactNumber?.message}
                            required
                        />
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            required
                        />
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            {...field}
                            label="category *"
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            required
                        >
                            {FOOD_TYPES.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name="cuisines"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            {...field}
                            multiple
                            label="cuisines *"
                            error={!!errors.cuisines}
                            helperText={errors.cuisines?.message}
                            required
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
                            {CUISINES.map((type) => (
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
