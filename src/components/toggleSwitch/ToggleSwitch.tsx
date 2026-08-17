import { FormControlLabel } from '@mui/material';

import { StyledSwitch } from './ToggleSwitch.styles';
import { ToggleSwitchProps } from './toggleSwitch.types';

export const ToggleSwitch = ({ label, ...props }: ToggleSwitchProps) => (
    <FormControlLabel label={label} control={<StyledSwitch {...props} />} />
);
