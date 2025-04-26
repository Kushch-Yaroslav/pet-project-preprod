import React, { useEffect, useState, useRef } from 'react';
import { ProximityContext, Zone } from '../context/ProximityContext';
import {targets} from "../utils/proximityRegistry.ts";
import {LightningOverlay} from "./LightingOverlay.tsx";

interface ProximityProviderProps {
    children: React.ReactNode;
}

export const ProximityProvider: React.FC<ProximityProviderProps> = ({
                                                                        children,
                                                                    }) => {
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const [zone, setZone] = useState<Zone>(null);

    const targetRef = useRef<HTMLElement | null>(null);
    const zoneRef = useRef<Zone>(null);
    const hoverRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        targetRef.current = target;
    }, [target]);
    useEffect(() => {
        zoneRef.current = zone;
    }, [zone]);

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            const x = e.clientX;
            const y = e.clientY;
            setCursor({ x, y });

            const found = Array.from(targets).reduce<{ el: HTMLElement; d: number } | null>(
                (closest, el) => {
                    const r = el.getBoundingClientRect();
                    const dx = Math.max(r.left - x, 0, x - r.right);
                    const dy = Math.max(r.top - y, 0, y - r.bottom);
                    const d = Math.hypot(dx, dy);
                    return d < 350 && (!closest || d < closest.d)
                        ? { el, d }
                        : closest;
                },
                null
            );

            const newTarget = found ? found.el : null;
            const newZone: Zone = found
                ? found.d < 100
                    ? 'near'
                    : found.d < 200
                        ? 'mid'
                        : 'far'
                : null;

            if (hoverRef.current && hoverRef.current !== newTarget) {
                hoverRef.current.classList.remove('proximity-hover');
                hoverRef.current = null;
            }
            if (newTarget && (newZone === 'mid' || newZone === 'near')) {
                newTarget.classList.add('proximity-hover');
                hoverRef.current = newTarget;
            }

            setTarget(newTarget);
            setZone(newZone);
        }

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);


    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (e.button !== 0) return;

            const t = targetRef.current;
            const z = zoneRef.current;
            if (!t || z !== 'near') return;

            const input = t.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
            if (input) {
                input.click();
                return;
            }

            if (!t.contains(e.target as Node)) {
                e.preventDefault();
                t.click();
            }
        }

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);


    useEffect(() => {
        function onContextMenu(e: MouseEvent) {
            if (e.button !== 2) return;
            const t = targetRef.current;
            const z = zoneRef.current;
            if (t && z === 'mid') {
                e.preventDefault();
                const tag = t.tagName.toLowerCase();
                if (tag === 'input' || tag === 'textarea') {
                    (t as HTMLInputElement).focus();
                } else {
                    t.click();
                }
            }
        }
        window.addEventListener('contextmenu', onContextMenu);
        return () => window.removeEventListener('contextmenu', onContextMenu);
    }, []);

    return (
        <ProximityContext.Provider value={{ cursor, target, zone }}>
            {children}
            <LightningOverlay />
        </ProximityContext.Provider>
    );
};
