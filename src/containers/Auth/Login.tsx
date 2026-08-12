import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import logo from '@assets/images/logo.svg';
import { Button } from '@components/button';
import { PasswordField } from '@components/passwordField';
import { TextField } from '@components/textField';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { loginUser } from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { SnackbarTheme } from '@types';

import { authContent } from './auth.constants';
import {
    AuthCard,
    AuthContent,
    AuthForm,
    AuthHeader,
    AuthLink,
    AuthWrapper,
    LogoImage,
} from './auth.styles';
import { LoginFormData, loginSchema } from './auth.validation';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.auth);

    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            dispatch(
                showSnackbar({
                    message: 'Login successful.',
                    severity: SnackbarTheme.success,
                }),
            );
            await navigate(ROUTES.DISCOVERY, { replace: true });
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.error,
                }),
            );
        }
    };

    return (
        <AuthWrapper>
            <AuthContent>
                <AuthCard>
                    <AuthHeader>
                        <LogoImage src={logo} alt="Tangoo Logo" />
                        <Typography variant="h1">
                            {authContent.LOGIN_HEADING}
                        </Typography>
                        <Typography variant="body1" color="secondary.light">
                            {authContent.LOGIN_SUBHEADING}
                        </Typography>
                    </AuthHeader>
                    <AuthForm
                        onSubmit={(e) => {
                            void handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                {authContent.EMAIL_FIELD}
                            </Typography>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder={
                                            authContent.EMAIL_PLACEHOLDER
                                        }
                                        type="email"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                {authContent.PASSWORD_FIELD}
                            </Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        {...field}
                                        placeholder={
                                            authContent.PASSWORD_PLACEHOLDER
                                        }
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                        >
                            {authContent.LOGIN_BUTTON}
                        </Button>
                        <Box
                            display="Flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={0.5}
                        >
                            <Typography variant="body2">
                                {authContent.LOGIN_HELPER_TEXT}
                            </Typography>
                            <AuthLink to={ROUTES.SIGNUP}>
                                <Typography
                                    variant="body2"
                                    fontWeight="inherit"
                                >
                                    {authContent.SIGNUP_BUTTON}
                                </Typography>
                            </AuthLink>
                        </Box>
                    </AuthForm>
                </AuthCard>
            </AuthContent>
        </AuthWrapper>
    );
};
