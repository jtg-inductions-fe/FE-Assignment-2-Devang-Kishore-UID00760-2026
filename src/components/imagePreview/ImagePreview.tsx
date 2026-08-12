import { Close } from '@mui/icons-material';

import { ImagePreviewProps } from '@types';

import { RemoveButton, StyledImage, StyledPaper } from './ImagePreview.styles';

export const ImagePreview = ({ src, alt, onRemove }: ImagePreviewProps) => (
    <StyledPaper elevation={1}>
        <StyledImage src={src} alt={alt} />
        <RemoveButton onClick={onRemove}>
            <Close />
        </RemoveButton>
    </StyledPaper>
);
