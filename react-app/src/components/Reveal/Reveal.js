import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Pops children in with a little bounce once they scroll into view. */
export default function Reveal({ delay = 0, className = '', style, children }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(prefersReducedMotion());

    useEffect(() => {
        if (visible) return;
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [visible]);

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
            style={{ ...style, transitionDelay: visible ? `${delay}s` : '0s' }}
        >
            {children}
        </div>
    );
}
