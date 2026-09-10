import { Controller, Path, useFormContext } from 'react-hook-form';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomSelect } from '@components/customSelect';
import { FormImageField } from '@components/FormImageField';
import { FormTextField } from '@components/FormTextField';
import { TimeField } from '@components/timeField';
import { DAYS, inputFieldTypes } from '@constants';
import {
    addressFields,
    restaurantBasicInfoFields,
} from '@containers/addEditRestaurant/addEditRestaurant.config';
import { addRestaurantContent } from '@containers/addEditRestaurant/addEditRestaurant.constants';
import { AddRestaurantFormData } from '@containers/addEditRestaurant/AddEditRestaurant.types';
import { useAppSelector } from '@hooks/storeHooks';

export const RestaurantInfoSection = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<AddRestaurantFormData>();
    const {loading}=useAppSelector((state)=>state.restaurants)
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
                        {field.type === inputFieldTypes.IMAGE ? (
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
                                disabled={loading}
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
                                disabled={loading}
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
                        name="opening_time"
                        control={control}
                        render={({ field }) => (
                            <Grid>
                                <Typography variant="body1">
                                    {addRestaurantContent.OPENING_TIME_LABEL}
                                </Typography>
                                <TimeField
                                    {...field}
                                    fullWidth
                                    disabled={loading}
                                    error={!!errors.opening_time}
                                    helperText={errors.opening_time?.message}
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
                        name="closing_time"
                        control={control}
                        render={({ field }) => (
                            <Grid>
                                <Typography variant="body1">
                                    {addRestaurantContent.CLOSING_TIME_LABEL}
                                </Typography>
                                <TimeField
                                    {...field}
                                    fullWidth
                                    disabled={loading}
                                    error={!!errors.closing_time}
                                    helperText={errors.closing_time?.message}
                                />
                            </Grid>
                        )}
                    />
                </Grid>
            </Grid>

            <Grid size={12}>
                <Controller
                    name="working_days"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            {...field}
                            multiple
                            disabled={loading}
                            label={addRestaurantContent.WORKING_DAYS_LABEL}
                            error={!!errors.working_days}
                            helperText={errors.working_days?.message}
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
