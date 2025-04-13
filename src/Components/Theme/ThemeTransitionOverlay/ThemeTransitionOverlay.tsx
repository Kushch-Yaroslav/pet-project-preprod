import React, { useEffect, useRef } from 'react';
import './ThemeTransitionOverlay.css';
import {darkBg, lightBg} from "../../../Hooks/Theme/useTheme.ts";

interface Props {
    prevTheme: 'dark' | 'light';
    onAnimationEnd: () => void;
}

const ThemeTransitionFadeOverlay: React.FC<Props> = ({ prevTheme, onAnimationEnd }) => {
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

    const background = prevTheme === 'dark' ? darkBg : lightBg;

    return (
        <div
            ref={overlayRef}
            className="theme-transition-overlay"
            style={{ background }}
        />
    );
};

export default ThemeTransitionFadeOverlay;
