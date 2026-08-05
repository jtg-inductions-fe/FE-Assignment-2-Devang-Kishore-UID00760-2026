import type { ToggleButtonGroupProps } from '@mui/material';

import { FoodType } from '@types';
export interface VegToggleProps
    extends Omit<ToggleButtonGroupProps, 'value' | 'onChange'> {
    value: FoodType;
    onChange: (value: FoodType) => void;
}
