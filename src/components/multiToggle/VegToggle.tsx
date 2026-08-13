import { VegToggleProps } from '@types';
import { FoodType } from '@types';

import { foodCategory } from './vegToggle.constant';
import {
    MultiToggleContainer,
    StyledToggleButton,
    StyledToggleButtonGroup,
} from './VegToggle.styles';

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
                {foodCategory.BOTH}
            </StyledToggleButton>
            <StyledToggleButton value="veg" color="secondary">
                {foodCategory.VEG}
            </StyledToggleButton>
            <StyledToggleButton value="nonVeg" color="error">
                {foodCategory.NON_VEG}
            </StyledToggleButton>
        </StyledToggleButtonGroup>
    </MultiToggleContainer>
);
