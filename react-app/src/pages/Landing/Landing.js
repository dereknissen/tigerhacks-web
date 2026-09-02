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
import { Pulse, SpeakerOn, SpeakerOff } from '../../components/Icons/Icons';
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

/* Sounds */
import DaySound from '../../assets/sounds/day.mp3';
import NightSound from '../../assets/sounds/night.mp3';

/* React Dependencies */
import { useContext, useEffect, useRef, useState } from 'react';
import { WindowWidthContext, ThemeContext } from '../../App';

const NAV_SIGNS = [
    { name: 'About', img: AboutSign, link: '#about', side: 'right', top: '14.5%' },
    { name: 'Gallery', img: GallerySign, link: '#gallery', side: 'left', top: '34%' },
    { name: 'Tracks', img: TracksSign, link: '#tracks', side: 'right', top: '53.5%' },
    { name: 'FAQ', img: FaqSign, link: '#faq', side: 'left', top: '73%' },
];

export default function Landing() {
    const windowWidth = useContext(WindowWidthContext);
    const { isDark } = useContext(ThemeContext);
    const [soundOn, setSoundOn] = useState(false);
    const dayAudioRef = useRef(null);
    const nightAudioRef = useRef(null);

    /* Two looping ambience tracks, one per time of day. Sound starts off by
       default (autoplay-with-audio is blocked by browsers anyway until a
       user gesture, and unexpected audio on page load is just annoying) —
       visitors opt in via the speaker toggle. */
    useEffect(() => {
        const day = new Audio(DaySound);
        const night = new Audio(NightSound);
        day.loop = true;
        night.loop = true;
        day.volume = 0.35;
        night.volume = 0.35;
        dayAudioRef.current = day;
        nightAudioRef.current = night;
        return () => {
            day.pause();
            night.pause();
        };
    }, []);

    useEffect(() => {
        const active = isDark ? nightAudioRef.current : dayAudioRef.current;
        const inactive = isDark ? dayAudioRef.current : nightAudioRef.current;
        if (!active || !inactive) return;
        inactive.pause();
        if (soundOn) {
            active.play().catch(() => {});
        } else {
            active.pause();
        }
    }, [isDark, soundOn]);

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div
                className={`hero-sky${isDark ? ' hero-sky-dark' : ''}`}
                style={{ backgroundImage: `url(${isDark ? BackgroundDark : BackgroundLight})` }}
            >
                <button
                    type="button"
                    className="hero-sound-toggle"
                    onClick={() => setSoundOn((s) => !s)}
                    aria-label={soundOn ? 'Mute ambience' : 'Play ambience'}
                >
                    {soundOn ? <SpeakerOn style={{ width: '18pt' }} /> : <SpeakerOff style={{ width: '18pt' }} />}
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
                            <a href="https://www.instagram.com/tigerhacks/" target="_blank" rel="noreferrer" className="social-media-link social-badge">
                                <img src={Instagram} alt="Instagram" />
                            </a>
                            <a href="https://discord.gg/NwsWUB7Fp9" target="_blank" rel="noreferrer" className="social-media-link social-badge">
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
