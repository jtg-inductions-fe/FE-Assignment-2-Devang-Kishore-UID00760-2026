export interface NumberStepperProps {
    label?: string;
    value: number;
    disabled?: boolean;
    onChange: (value: number) => void;
    onBlur?: (value: number) => void;
    onDecrement: () => void;
}
