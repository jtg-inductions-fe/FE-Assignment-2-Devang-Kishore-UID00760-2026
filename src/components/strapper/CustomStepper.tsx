import { Step, StepLabel, Stepper } from '@mui/material';

import { CustomStepperProps } from './CustomStepper.type';
export const CustomStepper = ({
    activeStep,
    steps,
    ...props
}: CustomStepperProps) => (
    <Stepper activeStep={activeStep} alternativeLabel {...props}>
        {steps.map((step) => (
            <Step key={step}>
                <StepLabel>{step.toUpperCase()}</StepLabel>
            </Step>
        ))}
    </Stepper>
);
