import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Checkbox, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import logo from '@assets/images/logo.svg';
import { Button } from '@components/button';
import { PasswordField } from '@components/passwordField';
import { TextField } from '@components/textField';
import { ROUTES } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { loginUser, signupUser } from '@store/slices/auth/authSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { Role, SnackbarTheme } from '@types';

import { authContent } from './auth.constants';
import {
    AuthCard,
    AuthContent,
    AuthFooter,
    AuthForm,
    AuthHeader,
    AuthLink,
    AuthWrapper,
    LogoImage,
} from './auth.styles';
import {
    LoginFormData,
    loginSchema,
    SignupFormData,
    signupSchema,
} from './auth.validations';

export const Auth = ({ isSignUp = false }: { isSignUp: boolean }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.auth);
    const signupDefaultValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: Role.customer,
    };
    const loginDefaultValues = {
        email: '',
        password: '',
    };
    type FormData = SignupFormData | LoginFormData;

    const { control, handleSubmit } = useForm<FormData>({
        resolver: yupResolver(isSignUp ? signupSchema : loginSchema),
        defaultValues: isSignUp ? signupDefaultValues : loginDefaultValues,
    });

    const onSignUp = async (data: FormData) => {
        try {
            await dispatch(signupUser(data as SignupFormData)).unwrap();
            dispatch(
                showSnackbar({
                    message: `${authContent.SIGNUP_SUCCESS}`,
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

    const onLogin = async (data: FormData) => {
        try {
            await dispatch(loginUser(data as LoginFormData)).unwrap();
            dispatch(
                showSnackbar({
                    message: `${authContent.LOGIN_SUCCESS}`,
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
                        <LogoImage src={logo} alt="Zangoo Logo" />
                        <Typography variant="h1">
                            {isSignUp
                                ? authContent.SIGNUP_HEADING
                                : authContent.LOGIN_HEADING}
                        </Typography>
                        <Typography variant="body1" color="secondary.light">
                            {isSignUp
                                ? authContent.SIGNUP_SUBHEADING
                                : authContent.LOGIN_SUBHEADING}
                        </Typography>
                    </AuthHeader>
                    <AuthForm
                        onSubmit={(e) => {
                            void handleSubmit(isSignUp ? onSignUp : onLogin)(e);
                        }}
                    >
                        {isSignUp && (
                            <Stack flexDirection="column" gap={1}>
                                <Typography variant="subtitle1">
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
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />
                            </Stack>
                        )}
                        <Stack gap={1} flexDirection="column">
                            <Typography variant="subtitle1">
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
                        </Stack>
                        <Stack flexDirection="column" gap={1}>
                            <Typography variant="subtitle1">
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
                        </Stack>
                        {isSignUp && (
                            <Stack flexDirection="column" gap={1}>
                                <Typography variant="subtitle1">
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
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />
                            </Stack>
                        )}
                        {isSignUp && (
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
                                            inputProps={{
                                                'aria-label': 'role',
                                            }}
                                        />
                                    )}
                                />
                                <Typography variant="h6">
                                    {authContent.ROLE_FILED}
                                </Typography>
                            </Box>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                        >
                            {isSignUp
                                ? authContent.SIGNUP_BUTTON
                                : authContent.LOGIN_BUTTON}
                        </Button>
                        <AuthFooter>
                            <Typography variant="body2">
                                {isSignUp
                                    ? authContent.SIGNUP_HELPER_TEXT
                                    : authContent.LOGIN_HELPER_TEXT}
                            </Typography>
                            <AuthLink
                                to={isSignUp ? ROUTES.LOGIN : ROUTES.SIGNUP}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight="inherit"
                                >
                                    {isSignUp
                                        ? authContent.LOGIN_BUTTON
                                        : authContent.SIGNUP_BUTTON}
                                </Typography>
                            </AuthLink>
                        </AuthFooter>
                    </AuthForm>
                </AuthCard>
            </AuthContent>
        </AuthWrapper>
    );
};
