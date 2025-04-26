import React from 'react';
import styles from './ThemeSwitcher.module.scss';
import {ThemeEnum} from "../../../Enum/ThemeEnum.ts";
import {ProximityTarget} from "../../../Features/Proximity/components/ProximityTarget.tsx";

interface Props {
    theme: ThemeEnum;
    onToggle: () => void;
    disabled?: boolean;
}

const ThemeSwitcher: React.FC<Props> = ({ theme, onToggle, disabled }) => (
    <ProximityTarget>
        <div className={styles.themeSwitcher}>
            <input
                type="checkbox"
                id="theme-toggle"
                onChange={onToggle}
                checked={theme === ThemeEnum.LIGHT}
                disabled={disabled}
            />
            <label htmlFor="theme-toggle">
                <span className={styles.icon}>☀️</span>
                <span className={styles.icon}>🌙</span>
                <span className={styles.slider} />
            </label>
        </div>
    </ProximityTarget>
);

export default ThemeSwitcher;
