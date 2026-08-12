import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Button } from '@components/button';
import { Logo } from '@components/logo';
import { PasswordField } from '@components/passwordField';
import { TextField } from '@components/textField';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { signupUser } from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { Role, SnackbarTheme } from '@types';

import { authContent } from './auth.constants';
import {
    AuthCard,
    AuthContent,
    AuthForm,
    AuthHeader,
    AuthLink,
    AuthWrapper,
} from './auth.styles';
import { SignupFormData, signupSchema } from './auth.validation';

export const Signup = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.auth);

    const { control, handleSubmit } = useForm<SignupFormData>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: Role.customer,
        },
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            await dispatch(signupUser(data)).unwrap();
            dispatch(
                showSnackbar({
                    message: 'SignUP successful.',
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
                        <Logo />
                        <Typography variant="h1">
                            {authContent.SIGNUP_HEADING}
                        </Typography>
                        <Typography variant="body1" color="secondary.light">
                            {authContent.SIGNUP_SUBHEADING}
                        </Typography>
                    </AuthHeader>
                    <AuthForm
                        onSubmit={(e) => {
                            void handleSubmit(onSubmit)(e);
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                {authContent.NAME_FIELD}
                            </Typography>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        placeholder={
                                            authContent.NAME_PLACEHOLDER
                                        }
                                        type="name"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>
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
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                {authContent.CONFIRM_PASSWORD_FIELD}
                            </Typography>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        {...field}
                                        placeholder={
                                            authContent.CONFIRM_PASSWORD_PLACEHOLDER
                                        }
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
                                        checked={value === Role.owner}
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
                                {authContent.ROLE_FILED}
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
                            {authContent.SIGNUP_BUTTON}
                        </Button>
                        <Box
                            display="Flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={0.5}
                        >
                            <Typography variant="body2">
                                {authContent.SIGNUP_HELPER_TEXT}
                            </Typography>
                            <AuthLink to={ROUTES.LOGIN}>
                                <Typography
                                    variant="body2"
                                    fontWeight="inherit"
                                >
                                    {authContent.LOGIN_BUTTON}
                                </Typography>
                            </AuthLink>
                        </Box>
                    </AuthForm>
                </AuthCard>
            </AuthContent>
        </AuthWrapper>
    );
};
