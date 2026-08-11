import { Link } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ROUTES } from '@constants';

import { exceptionPagesContent } from './fallbackPage.constants';
import { ComponentGrid, MainBox } from './FallbackPage.styles';
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
                        {exceptionPagesContent.ERROR_STATUS_CODE}
                    </Typography>
                    <Typography variant="h4" color="error.main">
                        {exceptionPagesContent.ERROR_TITLE}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {exceptionPagesContent.ERROR_CONTENT}
                    </Typography>
                    <Button
                        component={Link}
                        to={ROUTES.ROOT}
                        variant="contained"
                        size="large"
                        disableElevation
                    >
                        {exceptionPagesContent.BACK_BUTTON}
                    </Button>
                </ComponentGrid>
            </Grid>
        </Container>
    </MainBox>
);
