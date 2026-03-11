import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    return (
        <ReactLenis root options={{
            lerp: 0.12,
            duration: 1.2,
            smoothWheel: true,
        }}>

            {children}
        </ReactLenis>
    );
};
