import { Step, StepLabel, Stepper } from '@mui/material';
export const CustomStepper = ({
    activeStep,
    steps,
}: {
    activeStep: number;
    steps: string[];
}) => (
    <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
            <Step key={step}>
                <StepLabel>{step}</StepLabel>
            </Step>
        ))}
    </Stepper>
);
