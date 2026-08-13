import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { TextFieldProps } from '@mui/material';

import { TextField } from '@components/textField';

import { SearchBarContainer } from './Searchbar.styled';

export const Searchbar = (props: TextFieldProps) => {
    const { slotProps, ...rest } = props;
    return (
        <SearchBarContainer>
            <TextField
                {...rest}
                slotProps={{
                    ...slotProps,
                    input: {
                        ...slotProps?.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </SearchBarContainer>
    );
};
