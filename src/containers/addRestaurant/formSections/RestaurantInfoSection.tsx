import { Controller, Path, useFormContext } from 'react-hook-form';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomSelect } from '@components/customSelect';
import { FormImageField } from '@components/FormImageField';
import { FormTextField } from '@components/FormTextField';
import { TimeField } from '@components/timeField';
import { DAYS } from '@constants';
import {
    addressFields,
    restaurantBasicInfoFields,
} from '@containers/addRestaurant/addRestaurant.config';
import { addRestaurantContent } from '@containers/addRestaurant/addRestaurant.constants';
import { AddRestaurantFormData } from '@containers/addRestaurant/AddRestaurant.types';

export const RestaurantInfoSection = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<AddRestaurantFormData>();

    return (
        <Grid container spacing={4}>
            <Grid size={12}>
                <Typography variant="h5">
                    {addRestaurantContent.RESTAURANT_INFO_HEADING}
                </Typography>
            </Grid>
            {restaurantBasicInfoFields.map((field) => {
                const fieldName = field.name as Path<AddRestaurantFormData>;
                return (
                    <Grid key={field.name} size={field.grid}>
                        {field.type === 'image' ? (
                            <FormImageField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                alt={addRestaurantContent.DISH_IMAGE_ALT}
                            />
                        ) : (
                            <FormTextField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                type={field.type}
                                multiline={field.multiline}
                                rows={field.rows}
                                required
                            />
                        )}
                    </Grid>
                );
            })}
            <Grid container spacing={4}>
                <Typography variant="h5">
                    {addRestaurantContent.ADDRESS_HEADING}
                </Typography>
                {addressFields.map((field) => {
                    const fieldName = field.name as Path<AddRestaurantFormData>;
                    return (
                        <Grid key={field.name} size={field.grid}>
                            <FormTextField
                                name={fieldName}
                                control={control}
                                label={field.label}
                                type={field.type}
                                multiline={field.multiline}
                                rows={field.rows}
                                required
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid size={12}>
                <Typography variant="h5">
                    {addRestaurantContent.TIMINGS_HEADING}
                </Typography>
            </Grid>
            <Grid container spacing={8} size={12}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="openingTime"
                        control={control}
                        render={({ field }) => (
                            <Grid>
                                <Typography variant="body1">
                                    {addRestaurantContent.OPENING_TIME_LABEL}
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
                                    {addRestaurantContent.CLOSING_TIME_LABEL}
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
                            label={`${addRestaurantContent.WORKING_DAYS_LABEL}`}
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
