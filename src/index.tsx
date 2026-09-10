import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { Feedback } from '@containers/feedback/Feedback.container';
import { setupInterceptor } from '@services/api';
import { theme } from '@theme';

import { router } from './routes/router';
import { store } from './store/store';

setupInterceptor(store.dispatch);
const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <RouterProvider router={router} />
                <Feedback />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
