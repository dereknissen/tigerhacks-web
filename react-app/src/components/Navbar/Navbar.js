import { useContext, useState } from 'react';
import Logo from '../../assets/logo/tigerhacks-color.png';
import { WindowWidthContext } from '../../App';
import './Navbar.css';

const LINKS = [
    { label: 'About', href: '/#about' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Tracks', href: '/#tracks' },
    { label: 'FAQ', href: '/#faq' },
];

export default function Navbar({ isDark = false }) {
    const windowWidth = useContext(WindowWidthContext);
    const isMobile = windowWidth <= 800;
    const [open, setOpen] = useState(false);

    return (
        <div id="navbar-wrap">
            <nav id="navbar" className={isDark ? 'nav-dark' : ''}>
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
            </nav>

            {isMobile && open && (
                <div className={`nav-mobile-menu paper-card fade-in-anim ${isDark ? 'nav-dark' : ''}`}>
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
