import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CartSummaryProps } from '@types';

import { CartSummaryContent } from './cartSummary.constants';
import {
    CartSummaryContainer,
    SummaryRow,
    TotalRow,
} from './CartSummary.styles';

export const CartSummary = (props: CartSummaryProps) => {
    const { subTotal, bookingFee, total, onCheckout } = props;
    return (
        <CartSummaryContainer>
            <SummaryRow>
                <Typography variant="h5">
                    {CartSummaryContent.SUBTOTAL_LABEL}
                </Typography>
                <Typography variant="h5">&#8377;{subTotal}</Typography>
            </SummaryRow>
            <SummaryRow>
                <Typography variant="h5">
                    {CartSummaryContent.BOOKING_LABEL}
                </Typography>
                <Typography variant="h5">&#8377;{bookingFee}</Typography>
            </SummaryRow>
            <Divider />
            <TotalRow>
                <Typography variant="h5">
                    {CartSummaryContent.TOTAL_LABEL}
                </Typography>
                <Typography variant="h5">&#8377;{total}</Typography>
            </TotalRow>
            <Grid container justifyContent="end">
                <Button variant="contained">
                    <ShoppingCartCheckoutIcon />
                    <Typography variant="body1" onClick={onCheckout}>
                        {CartSummaryContent.CHECKOUT_BUTTON}
                    </Typography>
                </Button>
            </Grid>
        </CartSummaryContainer>
    );
};
