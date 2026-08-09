import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CartSummaryProps } from '@types';

import {
    CartSummaryContainer,
    SummaryRow,
    TotalRow,
} from './CartSummary.styled';

export const CartSummary = (props: CartSummaryProps) => {
    const { subTotal, bookingFee, total, onCheckout } = props;
    return (
        <CartSummaryContainer>
            <SummaryRow>
                <Typography variant="h5">Subtotal</Typography>
                <Typography variant="h5">&#8377;{subTotal}</Typography>
            </SummaryRow>
            <SummaryRow>
                <Typography variant="h5">Booking Fee</Typography>
                <Typography variant="h5">&#8377;{bookingFee}</Typography>
            </SummaryRow>
            <Divider />
            <TotalRow>
                <Typography variant="h5">Total</Typography>
                <Typography variant="h5">&#8377;{total}</Typography>
            </TotalRow>
            <Grid container justifyContent="end">
                <Button variant="contained">
                    <ShoppingCartCheckoutIcon />
                    <Typography variant="body1" onClick={onCheckout}>
                        Checkout
                    </Typography>
                </Button>
            </Grid>
        </CartSummaryContainer>
    );
};
