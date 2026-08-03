import { ToggleSwitchProps } from '@types';

import { StyledFormControlLabel, StyledSwitch } from './ToggleSwitch.styles';

export const ToggleSwitch = ({ label, ...props }: ToggleSwitchProps) => (
    <StyledFormControlLabel
        label={label}
        control={<StyledSwitch {...props} />}
    />
);
