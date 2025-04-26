import  { createContext, useContext } from 'react';

export type Zone = 'far' | 'mid' | 'near' | null;

export interface ProximityState {
    cursor: { x: number; y: number };
    target: HTMLElement | null;
    zone: Zone;
}

export const ProximityContext = createContext<ProximityState>({
    cursor: { x: 0, y: 0 },
    target: null,
    zone: null,
});

export function useProximity() {
    return useContext(ProximityContext);
}
