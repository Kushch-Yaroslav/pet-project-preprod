import { useState, useCallback, useEffect } from 'react';

export const darkBg = 'radial-gradient(ellipse at top left, #0f0c29, #302b63, #24243e)';
export const lightBg = '#ffffff';

export const useTheme = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [prevTheme, setPrevTheme] = useState<'dark' | 'light'>('dark');
    const [transitioning, setTransitioning] = useState(false);

    const toggleTheme = useCallback(() => {
        if (transitioning) return;
        setTransitioning(true);
        setPrevTheme(theme);
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }, [theme, transitioning]);

    useEffect(() => {
        document.body.classList.toggle('light', theme === 'light');
    }, [theme]);

    const finishTransition = useCallback(() => {
        setTransitioning(false);
    }, []);

    return {
        theme,
        prevTheme,
        transitioning,
        toggleTheme,
        finishTransition,
    };
};
