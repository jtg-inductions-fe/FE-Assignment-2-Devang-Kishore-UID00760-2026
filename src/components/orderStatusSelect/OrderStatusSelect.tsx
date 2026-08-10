import { MenuItem } from '@mui/material';

import type { OrderStatus } from '@types';
import { OrderStatusSelectProps } from '@types';

import { StatusSelect } from './OrderStatusSelect.styled';

const statuses: OrderStatus[] = [
    'pending',
    'accepted',
    'preparing',
    'outForDelivery',
    'rejected',
    'delivered',
];

export const OrderStatusSelect = (props: OrderStatusSelectProps) => {
    const { value, onChange } = props;
    return (
        <StatusSelect
            value={value}
            onChange={(event) => onChange(event.target.value as OrderStatus)}
        >
            {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                    {status}
                </MenuItem>
            ))}
        </StatusSelect>
    );
};
