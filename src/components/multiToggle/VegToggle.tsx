import type { VegToggleProps } from '@types';
import { FoodType } from '@types';

import {
    MultiToggleContainer,
    StyledToggleButton,
    StyledToggleButtonGroup,
} from './VegToggle.styled';

export const MultiToggle = ({ value, onChange, ...props }: VegToggleProps) => (
    <MultiToggleContainer>
        <StyledToggleButtonGroup
            exclusive
            value={value}
            onChange={(_, newValue: FoodType) => {
                if (newValue) {
                    onChange(newValue);
                }
            }}
            {...props}
        >
            <StyledToggleButton value="both" color="primary">
                Both
            </StyledToggleButton>
            <StyledToggleButton value="veg" color="secondary">
                Veg
            </StyledToggleButton>
            <StyledToggleButton value="nonVeg" color="error">
                Non Veg
            </StyledToggleButton>
        </StyledToggleButtonGroup>
    </MultiToggleContainer>
);
