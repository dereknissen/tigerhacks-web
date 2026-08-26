/* Styles */
import './Landing.css';

/* Components */
import Navbar from '../../components/Navbar/Navbar';
import Sign from '../../components/Sign/Sign';
import Signpost from '../../components/Signpost/Signpost';
import Countdown from '../../components/Countdown/Countdown';
import About from '../../components/About/About';
import Gallery from '../../components/Gallery/Gallery';
import Tracks from '../../components/Tracks/Tracks';
import Leadership from '../../components/Leadership/Leadership';
import FAQ from '../../components/FAQ/FAQ';
import Footer from '../../components/Footer/Footer';
import { Pulse, Sun, Moon } from '../../components/Icons/Icons';
import Parallax from '../../components/Parallax/Parallax';

/* Images */
import Stethoscope from '../../assets/theme/stethoscope.png';
import BackgroundLight from '../../assets/theme/background-light.png';
import BackgroundDark from '../../assets/theme/background-dark.png';
import AboutSign from '../../assets/theme/about.png';
import GallerySign from '../../assets/theme/gallery.png';
import TracksSign from '../../assets/theme/tracks.png';
import FaqSign from '../../assets/theme/faq.png';
import Instagram from '../../assets/icons/instagram.png';
import Discord from '../../assets/icons/discord.png';

/* React Dependencies */
import { useContext, useEffect, useState } from 'react';
import { WindowWidthContext } from '../../App';

const THEME_KEY = 'tigerhacks-hero-theme';

const NAV_SIGNS = [
    { name: 'About', img: AboutSign, link: '#about', side: 'right', top: '14.5%' },
    { name: 'Gallery', img: GallerySign, link: '#gallery', side: 'left', top: '34%' },
    { name: 'Tracks', img: TracksSign, link: '#tracks', side: 'right', top: '53.5%' },
    { name: 'FAQ', img: FaqSign, link: '#faq', side: 'left', top: '73%' },
];

export default function Landing() {
    const windowWidth = useContext(WindowWidthContext);
    const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === 'dark');

    useEffect(() => {
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <div>
            <Navbar isDark={isDark} />

            {/* Hero Section */}
            <div
                className={`hero-sky${isDark ? ' hero-sky-dark' : ''}`}
                style={{ backgroundImage: `url(${isDark ? BackgroundDark : BackgroundLight})` }}
            >
                <button
                    type="button"
                    className="hero-theme-toggle"
                    onClick={() => setIsDark((d) => !d)}
                    aria-label={isDark ? 'Switch to day' : 'Switch to night'}
                >
                    {isDark ? <Moon style={{ width: '18pt' }} /> : <Sun style={{ width: '18pt' }} />}
                </button>

                <Signpost signs={NAV_SIGNS} />

                <div className="section-wrap hero-content">
                    <div className="fade-in-anim hero-board paper-card">
                        <img src={Stethoscope} className="hero-stethoscope" alt="" />
                        <div className="hero-text">
                            <span className="section-tag">
                                <Pulse className="health-icon" />
                                September 25th &ndash; 27th, 2026
                            </span>
                            <h1 className="hero-title">TigerHacks <span className="hero-title-accent">2026</span></h1>
                            <p className="hero-tagline">
                                A weekend hackathon on Mizzou's campus. Come build something wonderful with new friends.
                            </p>
                            <a className="btn" href="/register">
                                {windowWidth > 600 ? 'Register Now' : 'Register'}
                            </a>
                        </div>
                    </div>

                    <div className="fade-in-anim hero-folders-row hero-folders-row-mobile">
                        {NAV_SIGNS.map((sign, i) => (
                            <Parallax key={sign.name} speed={0.05 + i * 0.02}>
                                <div className="folder-float" style={{ animationDelay: `${i * 0.35}s` }}>
                                    <Sign name={sign.name} img={sign.img} link={sign.link} />
                                </div>
                            </Parallax>
                        ))}
                    </div>

                    <div className="fade-in-anim hero-bottom-row">
                        <div className="hero-socials">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-media-link social-badge">
                                <img src={Instagram} alt="Instagram" />
                            </a>
                            <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-media-link social-badge">
                                <img src={Discord} alt="Discord" />
                            </a>
                        </div>
                        <Countdown />
                    </div>
                </div>
            </div>

            <About />
            <Gallery />
            <Tracks />
            <Leadership />
            <FAQ />
            <Footer />
        </div>
    );
}
