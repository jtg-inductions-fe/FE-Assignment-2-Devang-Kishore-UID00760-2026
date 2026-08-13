import { StepperProps } from '@mui/material';

export interface CustomStepperProps extends StepperProps {
    activeStep: number;
    steps: string[];
}
