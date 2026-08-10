import { OrderCard } from '@components/orderCard';
import { OrdersProps } from '@types';

import { OrderContainer } from './Orders.styled';

export const Orders = (props: OrdersProps) => {
    const { orders, canEditStatus, onReorder, onStatusChange, showReorder } =
        props;
    return (
        <OrderContainer>
            {orders.map(({ order, statusLabel, bookingFee, total }) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    statusLabel={statusLabel}
                    bookingFee={bookingFee}
                    total={total}
                    canEditStatus={canEditStatus}
                    onStatusChange={(status) =>
                        onStatusChange(order.id, status)
                    }
                    onReorder={onReorder}
                    showReorder={showReorder}
                />
            ))}
        </OrderContainer>
    );
};
