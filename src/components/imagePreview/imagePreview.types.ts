export interface ImagePreviewProps {
    src: string;
    alt: string;
    variant?: 'logo' | 'banner';
    onRemove: () => void;
}
