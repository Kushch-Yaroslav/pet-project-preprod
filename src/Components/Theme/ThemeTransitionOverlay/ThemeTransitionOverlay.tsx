import React, { useEffect, useRef } from 'react';
import './ThemeTransitionOverlay.css';

interface Props {
    onAnimationEnd: () => void;
}

const ThemeTransitionFadeOverlay: React.FC<Props> = ({  onAnimationEnd }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (overlayRef.current) {
            overlayRef.current.style.opacity = '0';
        }
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, 500);

        return () => clearTimeout(timer);
    }, [onAnimationEnd]);


    return (
        <div
            ref={overlayRef}
            className="theme-transition-overlay"
        />
    );
};

export default ThemeTransitionFadeOverlay;
