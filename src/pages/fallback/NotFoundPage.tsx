import { Link } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { ROUTES } from '@constants';

import { exceptionPagesContent } from './fallbackPage.constants';
import { ComponentGrid, MainBox } from './FallbackPage.styles';

/**
 * Not found page.
 * @returns  not found page.
 */
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
                    <Typography variant="h1">
                        {exceptionPagesContent.NOT_FOUND_STATUS_CODE}
                    </Typography>
                    <Typography variant="h4">
                        {exceptionPagesContent.NOT_FOUND_TITLE}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        {exceptionPagesContent.NOT_FOUNT_CONTENT}
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
