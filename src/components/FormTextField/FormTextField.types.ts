import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormTextFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    type?: string;
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    disabled?:boolean;
}
