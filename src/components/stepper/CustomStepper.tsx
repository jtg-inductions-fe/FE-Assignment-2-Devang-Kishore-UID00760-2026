import { Step, StepLabel, Stepper } from '@mui/material';

import { CustomStepperProps } from './CustomStepper.types';

export const CustomStepper = ({
    activeStep,
    steps,
    ...stepperProps
}: CustomStepperProps) => (
    <Stepper activeStep={activeStep} alternativeLabel {...stepperProps}>
        {steps.map((step) => (
            <Step key={step}>
                <StepLabel>{step.toUpperCase()}</StepLabel>
            </Step>
        ))}
    </Stepper>
);
