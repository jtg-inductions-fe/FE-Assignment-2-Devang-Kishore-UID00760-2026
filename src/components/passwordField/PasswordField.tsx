import { useState } from 'react';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { TextFieldProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { passwordLabels } from './passwordField.constants';
import { TextField } from '../textField';

export const PasswordField = (props: TextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword((show) => !show);

    const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            {...props}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePassword}
                                onMouseDown={handleMouseEvent}
                                onMouseUp={handleMouseEvent}
                                edge="end"
                                aria-label={
                                    showPassword
                                        ? `${passwordLabels.HIDE_PASSWORD}`
                                        : `${passwordLabels.SHOW_PASSWORD}`
                                }
                            >
                                {showPassword ? (
                                    <VisibilityOffOutlinedIcon />
                                ) : (
                                    <VisibilityOutlinedIcon />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};
