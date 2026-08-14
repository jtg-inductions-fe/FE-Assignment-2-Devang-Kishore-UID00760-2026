import { OrderCard } from '@components/orderCard';
import { OrdersProps } from '@types';

import { OrderContainer } from './Orders.styles';

export const Orders = (props: OrdersProps) => {
    const {
        orders,
        canEditStatus,
        onReorder,
        onStatusChange,
        showReorder,
        getSteps,
    } = props;
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
                    steps={getSteps(order.status).steps}
                    activeStep={getSteps(order.status).activeStep}
                />
            ))}
        </OrderContainer>
    );
};
