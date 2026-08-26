import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Wraps children in an element that drifts vertically as it passes through
 * the viewport — offset is driven by how far the element's own center is
 * from the viewport center, not raw scrollY, so it stays well-behaved no
 * matter where on the page it lives.
 */
export default function Parallax({ speed = 0.15, className, style, children }) {
    const ref = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const el = ref.current;
        let raf = null;

        const update = () => {
            raf = null;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elCenter = rect.top + rect.height / 2;
            const offset = (viewportCenter - elCenter) * speed;
            el.style.transform = `translateY(${offset}px)`;
        };

        const onScroll = () => {
            if (raf === null) raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf !== null) cancelAnimationFrame(raf);
        };
    }, [speed]);

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}
