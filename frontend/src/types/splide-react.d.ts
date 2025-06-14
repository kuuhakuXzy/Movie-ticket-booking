declare module '@splidejs/react-splide' {
    import { ComponentType } from 'react';

    export interface SplideProps {
        options?: Record<string, number>;
        hasTrack?: boolean;
        tag?: string;
        children?: React.ReactNode;
        className?: string;
        id?: string;
        ariaLabel?: string;
    }

    export interface SplideSlideProps {
        tag?: string;
        className?: string;
        children?: React.ReactNode;
    }

    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideSlideProps>;
}
