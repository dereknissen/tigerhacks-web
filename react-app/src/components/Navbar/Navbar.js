import { useContext, useState } from 'react';
import Logo from '../../assets/logo/tigerhacks-color.png';
import { WindowWidthContext, ThemeContext } from '../../App';
import { Sun, Moon } from '../Icons/Icons';
import './Navbar.css';

const LINKS = [
    { label: 'About', href: '/#about' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Tracks', href: '/#tracks' },
    { label: 'Rubric', href: '/#rubric' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
    const windowWidth = useContext(WindowWidthContext);
    const { isDark, setIsDark } = useContext(ThemeContext);
    const isMobile = windowWidth <= 800;
    const [open, setOpen] = useState(false);

    return (
        <div id="navbar-wrap">
            <nav id="navbar">
                <a href="/" className="nav-brand">
                    <img src={Logo} alt="TigerHacks logo" className="nav-logo" />
                    <span className="nav-brand-text">TigerHacks</span>
                </a>

                {!isMobile && (
                    <div className="nav-links">
                        {LINKS.map((link) => (
                            <a key={link.label} className="nav-link" href={link.href}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                <div className="nav-right">
                    {!isMobile && (
                        <a className="btn nav-register" href="/register">Register</a>
                    )}

                    {isMobile && (
                        <button
                            aria-label="Toggle menu"
                            className={`nav-burger ${open ? 'nav-burger-open' : ''}`}
                            onClick={() => setOpen((o) => !o)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    )}
                </div>
            </nav>

            <button
                type="button"
                className="nav-theme-toggle"
                onClick={() => setIsDark((d) => !d)}
                aria-label={isDark ? 'Switch to day' : 'Switch to night'}
            >
                {isDark ? <Moon style={{ width: '15pt' }} /> : <Sun style={{ width: '15pt' }} />}
            </button>

            {isMobile && open && (
                <div className="nav-mobile-menu paper-card fade-in-anim">
                    {LINKS.map((link) => (
                        <a key={link.label} className="nav-link" href={link.href} onClick={() => setOpen(false)}>
                            {link.label}
                        </a>
                    ))}
                    <a className="btn" href="/register" onClick={() => setOpen(false)}>Register</a>
                </div>
            )}
        </div>
    );
}
