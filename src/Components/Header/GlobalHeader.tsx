import React from 'react';
import {useTheme} from '../../Hooks/Theme/useTheme';
import ThemeTransitionFadeOverlay from "../Theme/ThemeTransitionOverlay/ThemeTransitionOverlay.tsx";
import ThemeSwitcher from "../Theme/ThemeSwitcher/ThemeSwitcher.tsx";
import styles from './GlobalHeader.module.scss'
import {IconUserMyProfile} from "../IconSvgComponents/IconSvgComponents.tsx";
import Button from "../UI-kit/Button/Button.tsx";

const GlobalHeader: React.FC = () => {
    const {theme, toggleTheme, transitioning, finishTransition} = useTheme();

    return (
        <>
            {transitioning && (
                <ThemeTransitionFadeOverlay
                    onAnimationEnd={finishTransition}
                />
            )}
            <header className={styles.globalHeaderContainer}>
                <div>Search</div>
                <div className={styles.globalHeaderContainerContent}>
                        <Button
                            text={'Home'}
                            className={styles.btnListHeader}
                        onClick={()=>console.log('HOME')}
                        />
                        <Button
                            text={'About Us'}
                            onClick={()=>console.log('About us')}

                            className={styles.btnListHeader}/>
                        <Button
                            text={'Contact'}
                            onClick={()=>console.log('Contact')}

                            className={styles.btnListHeader}/>
                    <div>
                        <IconUserMyProfile/>
                    </div>
                    <ThemeSwitcher theme={theme} onToggle={toggleTheme} disabled={transitioning}/>
                </div>
            </header>
        </>
    );
};

export default GlobalHeader;
