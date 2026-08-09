import { Stack, styled } from '@mui/material';

export const CartSummaryContainer = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1.5),
}));

export const SummaryRow = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const TotalRow = styled(SummaryRow)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));
