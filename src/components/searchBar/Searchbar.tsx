import { Search } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { TextFieldProps } from '@mui/material';

import { TextField } from '@components/textField';
import { BORDER_RADIUS } from '@constants';

export const Searchbar = (props: TextFieldProps) => {
    const { slotProps, ...rest } = props;
    return (
        <Box width="100%">
            <TextField
                {...rest}
                slotProps={{
                    ...slotProps,
                    input: {
                        ...slotProps?.input,
                        sx: {
                            maxHeight: 52,
                            borderRadius: BORDER_RADIUS.ROUNDED,
                            '& fieldset': {
                                borderRadius: BORDER_RADIUS.ROUNDED,
                            },
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Box>
    );
};
