import { Link } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ComponentGrid, MainBox } from './ErrorPage.styled';

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
