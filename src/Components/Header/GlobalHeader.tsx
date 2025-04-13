import React from 'react';
import { useTheme } from '../../Hooks/Theme/useTheme';
import ThemeTransitionFadeOverlay from "../Theme/ThemeTransitionOverlay/ThemeTransitionOverlay.tsx";
import ThemeSwitcher from "../Theme/ThemeSwitcher/ThemeSwitcher.tsx";

const GlobalHeader: React.FC = () => {
    const { theme, prevTheme, toggleTheme, transitioning, finishTransition } = useTheme();

    return (
        <>
            {transitioning && (
                <ThemeTransitionFadeOverlay
                    prevTheme={prevTheme}
                    onAnimationEnd={finishTransition}
                />
            )}
            <header className='global-header'>
                <ThemeSwitcher theme={theme} onToggle={toggleTheme} disabled={transitioning} />
            </header>
        </>
    );
};

export default GlobalHeader;
