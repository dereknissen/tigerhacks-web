import './Footer.css';
import Logo from '../../assets/logo/tigerhacks-color.png';
import Instagram from '../../assets/icons/instagram.png';
import Discord from '../../assets/icons/discord.png';
import { Heart } from '../Icons/Icons';

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-fence fence-strip"></div>
            <div className="footer-content">
                <div className="footer-brand">
                    <img src={Logo} alt="TigerHacks logo" className="footer-logo" />
                    <div>
                        <p className="footer-title">TigerHacks 2026</p>
                        <p className="footer-tagline">University of Missouri &middot; September 25&ndash;27</p>
                    </div>
                </div>

                <div className="footer-links">
                    <a className="nav-link" href="/#about">About</a>
                    <a className="nav-link" href="/#gallery">Gallery</a>
                    <a className="nav-link" href="/#tracks">Tracks</a>
                    <a className="nav-link" href="/#faq">FAQ</a>
                </div>

                <div className="footer-social">
                    <a href="https://www.instagram.com/tigerhacks/" target="_blank" rel="noreferrer" className="social-media-link footer-social-badge">
                        <img src={Instagram} alt="Instagram" />
                    </a>
                    <a href="https://discord.gg/NwsWUB7Fp9" target="_blank" rel="noreferrer" className="social-media-link footer-social-badge">
                        <img src={Discord} alt="Discord" />
                    </a>
                </div>
            </div>

            <p className="footer-copyright">
                Made with <Heart className="footer-heart" color="#E2574C" /> by the TigerHacks team &middot; &copy; 2026
            </p>
        </footer>
    );
}
