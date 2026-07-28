import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

import { SnackbarProvider } from './components/snackbar/SnackBar';
import { router } from './routes/router';
import { store } from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <SnackbarProvider>
                    <RouterProvider router={router} />
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
