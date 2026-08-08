import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Stack, Typography } from '@mui/material';

import { NumberStepperProps } from '@types';

import { StepperInput } from './NumberStepper.styled';

export const NumberStepper = (props: NumberStepperProps) => {
    const { label, value, disabled, onChange, onBlur, onDecrement } = props;
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {label && <Typography variant="body2">{label}</Typography>}
            <IconButton disabled={disabled} onClick={onDecrement}>
                <RemoveIcon />
            </IconButton>
            <StepperInput
                size="small"
                type="number"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(Number(e.target.value))}
                onBlur={() => onBlur?.(value)}
            />
            <IconButton
                disabled={disabled}
                onClick={() => {
                    onChange(value + 1);
                    onBlur?.(value + 1);
                }}
            >
                <AddIcon />
            </IconButton>
        </Stack>
    );
};
