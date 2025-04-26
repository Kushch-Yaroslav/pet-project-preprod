import React, {
    useEffect,
    useRef,
    ReactElement,
    isValidElement,
    cloneElement, JSX,
} from 'react';
import styles from '../styles/ProximityTarget.module.scss';
import {register, unregister} from '../utils/proximityRegistry.ts';

interface ProximityTargetProps {
    disableEffect?: boolean;
    children: ReactElement<any>;
}

export const ProximityTarget: React.FC<ProximityTargetProps> = ({
                                                                    children,
                                                                    disableEffect,
                                                                }) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!disableEffect && el) register(el);
        return () => {
            if (el) unregister(el);
        };
    }, [disableEffect]);

    if (!isValidElement(children)) {
        return children as unknown as JSX.Element;
    }

    return cloneElement<any>(children, {
        ref: (node: HTMLElement) => {
            ref.current = node;
            const origRef = (children as any).ref;
            if (typeof origRef === 'function') origRef(node);
            else if (origRef && typeof origRef === 'object') {
                (origRef as React.MutableRefObject<HTMLElement | null>).current = node;
            }
        },
        className: `${(children.props as any).className ?? ''} ${styles.proximityTarget}`,
    });
};
