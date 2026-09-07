import { Box, Card, CardContent, Stack, styled } from '@mui/material';

export const ProfileContainer = styled(Box)(({ theme }) => ({
    maxWidth: 900,
    margin: '0 auto',
    padding: theme.spacing(5, 2),
}));

export const ProfileCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const ProfileCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

export const NameContainer = styled(Stack)(
    ({ theme: { spacing, breakpoints } }) => ({
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: spacing(2),

        [breakpoints.up('lg')]: {
            flexDirection: 'row',
        },
    }),
);

export const AddressContainer = styled(Stack)(({ theme: { spacing } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing(2),
    marginBottom: spacing(3),
}));

export const AddressActions = styled(Stack)(({ theme: { spacing } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: spacing(1),
}));

export const LoaderContainer = styled(Stack)(({ theme: { spacing } }) => ({
    justifyContent: 'center',
    padding: spacing(5),
}));

export const ProfileHeader = styled(Stack)(({ theme: { spacing } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(4),
}));
