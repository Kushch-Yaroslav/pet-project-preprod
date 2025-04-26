import React, { useRef, useEffect } from 'react';
import { useProximity } from '../context/ProximityContext';

interface Bolt {
    path: [number, number][];
    alpha: number;
    ttl: number;
}

export const LightningOverlay: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { cursor, target, zone } = useProximity();
    const bolts = useRef<Bolt[]>([]);

    function randomBorderPoint(rect: DOMRect): [number, number] {
        const side = Math.floor(Math.random() * 4);
        const t = Math.random();
        switch (side) {
            case 0: return [rect.left + t * rect.width, rect.top];
            case 1: return [rect.right, rect.top + t * rect.height];
            case 2: return [rect.left + t * rect.width, rect.bottom];
            default: return [rect.left, rect.top + t * rect.height];
        }
    }

    function generateBolt() {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const [sx, sy] = randomBorderPoint(rect);
        const { x: ex, y: ey } = cursor;
        const segments = 5 + Math.floor(Math.random() * 5);
        const path: [number, number][] = [[sx, sy]];
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const ix = sx + (ex - sx) * t + (Math.random() - 0.5) * 30;
            const iy = sy + (ey - sy) * t + (Math.random() - 0.5) * 30;
            path.push([ix, iy]);
        }
        path.push([ex, ey]);
        bolts.current.push({
            path,
            alpha: 1,
            ttl: 20 + Math.random() * 20,
        });
    }

    function drawBorderOutline(ctx: CanvasRenderingContext2D) {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const perim = 2 * (rect.width + rect.height);
        const pts: [number, number][] = [];
        const total = 60;
        for (let i = 0; i < total; i++) {
            const d = (i / total) * perim;
            let x: number, y: number, nx: number, ny: number;
            if (d < rect.width) {
                x = rect.left + d; y = rect.top; nx = 0; ny = -1;
            } else if (d < rect.width + rect.height) {
                x = rect.right; y = rect.top + (d - rect.width); nx = 1; ny = 0;
            } else if (d < 2 * rect.width + rect.height) {
                x = rect.right - (d - rect.width - rect.height); y = rect.bottom; nx = 0; ny = 1;
            } else {
                x = rect.left; y = rect.bottom - (d - 2 * rect.width - rect.height); nx = -1; ny = 0;
            }
            const j = (Math.random() - 0.5) * 8;
            pts.push([x + nx * j, y + ny * j]);
        }

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        pts.forEach(p => ctx.lineTo(p[0], p[1]));
        ctx.closePath();
        ctx.globalAlpha = 0.7;
        ctx.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        let frame: number;
        function render() {
            if ( !ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

            ctx.lineWidth = zone === 'mid' ? 1.5 : 1;
            ctx.strokeStyle = 'rgba(100,200,255,0.8)';

            if (zone === 'near') {
                drawBorderOutline(ctx);
            }

            const rate = zone === 'near' ? 0.2 : zone === 'mid' ? 0.1 : zone === 'far' ? 0.01 : 0;
            if (Math.random() < rate) generateBolt();

            bolts.current.forEach(b => {
                ctx.beginPath();
                ctx.moveTo(b.path[0][0], b.path[0][1]);
                b.path.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
                ctx.globalAlpha = b.alpha;
                ctx.stroke();
                b.alpha -= 1 / b.ttl;
                b.ttl--;
            });

            bolts.current = bolts.current.filter(b => b.ttl > 0);

            frame = requestAnimationFrame(render);
        }
        render();

        return () => cancelAnimationFrame(frame);
    }, [zone, cursor.x, cursor.y, target]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};
