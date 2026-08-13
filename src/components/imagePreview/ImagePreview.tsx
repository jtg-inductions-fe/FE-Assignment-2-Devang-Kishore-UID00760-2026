import { Close } from '@mui/icons-material';

import { RemoveButton, StyledImage, StyledPaper } from './ImagePreview.styles';
import { ImagePreviewProps } from './imagePreview.types';

export const ImagePreview = ({ src, alt, onRemove }: ImagePreviewProps) => (
    <StyledPaper elevation={1}>
        <StyledImage src={src} alt={alt} />
        <RemoveButton onClick={onRemove}>
            <Close />
        </RemoveButton>
    </StyledPaper>
);
