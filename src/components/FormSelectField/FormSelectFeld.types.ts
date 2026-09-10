import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormSelectFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    options: string[];
    required?: boolean;
    disabled?:boolean;
}
