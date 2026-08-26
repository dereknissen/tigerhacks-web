import './404.css';
import Logo from '../../assets/logo/tigerhacks-color.png';
import { Cloud, Leaf } from '../../components/Icons/Icons';

export default function NotFound() {
    return (
        <div className="not-found">
            <Cloud className="cloud" style={{ width: '110pt', top: '8%', left: '10%' }} />
            <Cloud className="cloud" style={{ width: '90pt', top: '14%', right: '12%', animationDelay: '.8s' }} />

            <div className="not-found-card paper-card fade-in-anim">
                <img src={Logo} className="not-found-logo" alt="TigerHacks logo" />
                <Leaf className="not-found-leaf ac-bounce" />
                <h1 className="not-found-title">404</h1>
                <p className="not-found-text">Looks like you've wandered off the map. This page doesn't exist on our island.</p>
                <a className="btn" href="/">Back to Camp</a>
            </div>
        </div>
    );
}
