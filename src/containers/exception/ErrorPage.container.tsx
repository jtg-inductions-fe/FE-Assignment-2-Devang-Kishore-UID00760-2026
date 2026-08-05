import { Link } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ComponentGrid, MainBox } from './Exceptions.styled';

/**
 * Error page.
 * @returns  Error page.
 */
export const ErrorPage = () => (
    <MainBox>
        <Container maxWidth="md">
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
            >
                <ComponentGrid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h1" color="error.main">
                        500
                    </Typography>
                    <Typography variant="h4" color="error.main">
                        Internal Server Error!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Something went wrong at our end. Don&apos;t worry
                        it&apos;s not you it&apos;s us, Sorry about that.
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
