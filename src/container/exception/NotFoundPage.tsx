import { Link } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
const MainBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
}));

const ComponentGrid = styled(Grid)(() => ({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
}));

export const NotFoundPage = () => (
    <MainBox>
        <Container maxWidth="md">
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
            >
                <ComponentGrid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h4">Page Not Found</Typography>
                    <Typography variant="body1" color="text.primary">
                        The page you are looking for might have been removed.
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="large"
                        disableElevation
                    >
                        Back Home
                    </Button>
                </ComponentGrid>
            </Grid>
        </Container>
    </MainBox>
);
