import { useState } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { CustomSelect } from '@components/customSelect';
import { ImagePreview } from '@components/imagePreview';
import { TextField } from '@components/textField';
import type { AddRestaurantFormData } from '@types';

import { MenuCard } from '../AddRestaurant.styled';

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

export const MenuSection = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<AddRestaurantFormData>();
    const { fields, append, remove } = useFieldArray({ control, name: 'menu' });
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const addMenuItem = () => {
        append({
            name: '',
            description: '',
            cuisine: 'Indian',
            category: 'veg',
            price: 0,
            stock: 0,
            image: '',
        });
    };

    const handleRemove = (index: number) => {
        setDeleteIndex(index);
        setIsOpen((state) => !state);
    };

    return (
        <Grid container spacing={3}>
            {fields.map((item, index) => (
                <MenuCard container spacing={3} key={item.id}>
                    <Grid size={10}> Menu Item {index + 1}</Grid>
                    <Grid size={2}>
                        <Button
                            color="error"
                            disabled={fields.length == 1}
                            onClick={() => handleRemove(index)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name={`menu.${index}.name`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Dish Name"
                                    fullWidth
                                    required
                                    error={!!errors.menu?.[index]?.name}
                                    helperText={
                                        errors.menu?.[index]?.name?.message
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name={`menu.${index}.cuisine`}
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    {...field}
                                    label="Cuisine *"
                                    error={!!errors.menu?.[index]?.cuisine}
                                    helperText={
                                        errors.menu?.[index]?.cuisine?.message
                                    }
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
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name={`menu.${index}.category`}
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    {...field}
                                    label="Category *"
                                    error={!!errors.menu?.[index]?.category}
                                    helperText={
                                        errors.menu?.[index]?.category?.message
                                    }
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
                            name={`menu.${index}.price`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Dish Price"
                                    type="number"
                                    fullWidth
                                    required
                                    error={!!errors.menu?.[index]?.price}
                                    helperText={
                                        errors.menu?.[index]?.price?.message
                                    }
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                    slotProps={{ htmlInput: { min: 0 } }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name={`menu.${index}.stock`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Stock"
                                    type="number"
                                    fullWidth
                                    required
                                    error={!!errors.menu?.[index]?.stock}
                                    helperText={
                                        errors.menu?.[index]?.stock?.message
                                    }
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                    slotProps={{ htmlInput: { min: 0 } }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name={`menu.${index}.image`}
                            control={control}
                            render={({ field }) =>
                                field.value ? (
                                    <ImagePreview
                                        src={field.value}
                                        alt="Dish Image"
                                        onRemove={() => field.onChange('')}
                                    />
                                ) : (
                                    <TextField
                                        {...field}
                                        label="Image URL"
                                        fullWidth
                                        error={!!errors.menu?.[index]?.image}
                                        helperText={
                                            errors.menu?.[index]?.image?.message
                                        }
                                    />
                                )
                            }
                        />
                    </Grid>
                    <Grid size={12}>
                        <Controller
                            name={`menu.${index}.description`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={!!errors.menu?.[index]?.description}
                                    helperText={
                                        errors.menu?.[index]?.description
                                            ?.message
                                    }
                                />
                            )}
                        />
                    </Grid>
                </MenuCard>
            ))}
            <Button variant="outlined" onClick={addMenuItem}>
                Add Menu Item
            </Button>
            <ConfirmDialog
                open={isOpen}
                title={'Delete Menu Item.'}
                message={'Do you want to delete menu item?'}
                confirmLabel={'Yes Delete'}
                onCancel={() => setIsOpen((state) => !state)}
                onConfirm={() => {
                    remove(deleteIndex);
                    setIsOpen((state) => !state);
                }}
            />
        </Grid>
    );
};
