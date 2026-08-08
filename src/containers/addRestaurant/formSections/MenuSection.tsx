import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Grid2';

import { Button } from '@components/button';
import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { RestaurantMenuItem } from '@components/restaurantMenuItem/RestaurantMenuItem';
import type { AddRestaurantFormData, Cuisine, FoodType } from '@types';

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
                <RestaurantMenuItem
                    key={item.name}
                    index={index}
                    showDelete={fields.length > 0}
                    control={control}
                    cuisines={CUISINES as Cuisine[]}
                    foodTypes={FOOD_TYPES as FoodType[]}
                    onDelete={() => handleRemove(index)}
                    errors={errors}
                />
            ))}

            <Button variant="outlined" onClick={addMenuItem}>
                Add Menu Item
            </Button>

            <ConfirmDialog
                open={isOpen}
                key="Menu Item"
                title="Delete Menu Item."
                message="Do you want to delete menu item?"
                confirmLabel="Yes Delete"
                onCancel={() => setIsOpen((state) => !state)}
                onConfirm={() => {
                    remove(deleteIndex);
                    setIsOpen((state) => !state);
                }}
            />
        </Grid>
    );
};
