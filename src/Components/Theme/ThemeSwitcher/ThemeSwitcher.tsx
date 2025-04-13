import React from 'react';
import './ThemeSwitcher.css';

interface Props {
    theme: 'dark' | 'light';
    onToggle: () => void;
    disabled?: boolean;
}

const ThemeSwitcher: React.FC<Props> = ({ theme, onToggle, disabled }) => (
    <div className="theme-switcher">
        <input
            type="checkbox"
            id="theme-toggle"
            onChange={onToggle}
            checked={theme === 'light'}
            disabled={disabled}
        />
        <label htmlFor="theme-toggle">
            <span className="slider" />
        </label>
    </div>
);

export default ThemeSwitcher;
