import {useCallback, useEffect, useState} from 'react';
import {VarThemeColor} from "../../GlobalVarColor/themeVars.ts";
import {ThemeEnum} from "../../Enum/ThemeEnum.ts";

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.DARK);
    const [prevTheme, setPrevTheme] = useState<ThemeEnum>(ThemeEnum.DARK);
    const [transitioning, setTransitioning] = useState(false);

    const toggleTheme = useCallback(() => {
        if (transitioning) return;
        setTransitioning(true);
        const nextTheme = theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
        setPrevTheme(theme);
        setTheme(nextTheme);

        const themeColors = VarThemeColor[nextTheme];
        Object.entries(themeColors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }, [theme, transitioning]);


    useEffect(() => {
        document.body.classList.toggle('light', theme === ThemeEnum.LIGHT);
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