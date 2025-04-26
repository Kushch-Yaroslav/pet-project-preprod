import React from 'react';
import styles from './Button.module.scss'
import classNames from 'classnames';
import {ProximityTarget} from "../../../Features/Proximity/components/ProximityTarget.tsx";
import {ButtonUiVariantEnum} from "../../../Enum/ButtonUiVariantEnum.ts";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    variant?: ButtonUiVariantEnum;
}


const Button: React.FC<ButtonProps> = ({
                                           text,
                                           onClick,
                                           className,
                                           disabled = false,
                                           iconLeft,
                                           iconRight,
                                           variant = ButtonUiVariantEnum.PRIMARY,
                                       }) => {
    return (
        <ProximityTarget>
            <button
                onClick={onClick}
                disabled={disabled}
                className={classNames(styles.button, styles[variant], className)}
            >
                {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
                {text}
                {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
            </button>
        </ProximityTarget>
    );
};
export default Button