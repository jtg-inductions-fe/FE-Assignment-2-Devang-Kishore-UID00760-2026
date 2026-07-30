import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import logo from '@assets/images/logo.svg';
import { Button } from '@components/common/button';
import { PasswordField } from '@components/common/passwordField/PasswordField';
import { showSnackbar } from '@components/common/snackbar/snackbarSlice';
import { TextField } from '@components/common/textField';
import { ROUTES } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { loginUser } from '@store/slices/authSlice';

import {
    AuthCard,
    AuthContent,
    AuthForm,
    AuthHeader,
    AuthLink,
    AuthWrapper,
    LogoImage,
} from './auth.styled';
import { LoginFormData, loginSchema } from './auth.validation';

export const Login = () => {
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    const { loading } = UseAppSelector((state) => state.auth);

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
                    severity: 'success',
                }),
            );
            await navigate(ROUTES.DISCOVERY, { replace: true });
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: 'error',
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
                        <Typography variant="h1">WELCOME BACK</Typography>
                        <Typography variant="body1" color="secondary.light">
                            Sign in to continue ordering you favourite food
                        </Typography>
                    </AuthHeader>
                    <AuthForm
                        onSubmit={(e) => {
                            void handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Email
                            </Typography>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter your email"
                                        type="email"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Password
                            </Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        {...field}
                                        placeholder="Enter your password"
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
                            Login
                        </Button>
                        <Box
                            display="Flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={0.5}
                        >
                            <Typography variant="body2">
                                Don&apos;t have an account?
                            </Typography>
                            <AuthLink to={ROUTES.SIGNUP}>
                                <Typography
                                    variant="body2"
                                    fontWeight="inherit"
                                >
                                    Sign Up
                                </Typography>
                            </AuthLink>
                        </Box>
                    </AuthForm>
                </AuthCard>
            </AuthContent>
        </AuthWrapper>
    );
};
