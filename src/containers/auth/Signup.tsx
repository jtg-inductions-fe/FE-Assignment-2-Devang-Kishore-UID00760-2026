import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Button } from '@components/button';
import { Logo } from '@components/logo';
import { PasswordField } from '@components/passwordField/PasswordField';
import { TextField } from '@components/textField';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { signupUser } from '@store/slices/authSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';

import {
    AuthCard,
    AuthContent,
    AuthForm,
    AuthHeader,
    AuthLink,
    AuthWrapper,
} from './auth.styled';
import { SignupFormData, signupSchema } from './auth.validation';
import { ROUTES } from '../../constants';

export const Signup = () => {
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    const { loading } = UseAppSelector((state) => state.auth);

    const { control, handleSubmit } = useForm<SignupFormData>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
        },
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            await dispatch(signupUser(data)).unwrap();
            dispatch(
                showSnackbar({
                    message: 'SignUP successful.',
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
                        <Logo />
                        <Typography variant="h1">START ORDERING</Typography>
                        <Typography variant="body1" color="secondary.light">
                            Sign up to start ordering you favourite food
                        </Typography>
                    </AuthHeader>
                    <AuthForm
                        onSubmit={(e) => {
                            void handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Name
                            </Typography>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter your name"
                                        type="name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>
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
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Confirm Password
                            </Typography>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        {...field}
                                        placeholder="Enter password again"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>

                        <Box display="Flex" alignItems="center">
                            <Controller
                                name="role"
                                control={control}
                                render={({
                                    field: { value, onChange, ...field },
                                }) => (
                                    <Checkbox
                                        {...field}
                                        checked={value === 'owner'}
                                        onChange={(e) =>
                                            onChange(
                                                e.target.checked
                                                    ? 'owner'
                                                    : 'customer',
                                            )
                                        }
                                        inputProps={{ 'aria-label': 'role' }}
                                    />
                                )}
                            />
                            <Typography variant="h6">
                                Join as Restaurant Partner
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                        <Box
                            display="Flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={0.5}
                        >
                            <Typography variant="body2">
                                Already have an account?
                            </Typography>
                            <AuthLink to={ROUTES.LOGIN}>
                                <Typography
                                    variant="body2"
                                    fontWeight="inherit"
                                >
                                    Login
                                </Typography>
                            </AuthLink>
                        </Box>
                    </AuthForm>
                </AuthCard>
            </AuthContent>
        </AuthWrapper>
    );
};
