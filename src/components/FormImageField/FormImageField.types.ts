import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormImageFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    alt: string;
}
