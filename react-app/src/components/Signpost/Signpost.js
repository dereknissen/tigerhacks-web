import './Signpost.css';
import Pole from '../../assets/theme/pole.png';

export default function Signpost({ signs }) {
    return (
        <div className="signpost">
            <img src={Pole} className="signpost-pole" alt="" />
            {signs.map((sign, i) => (
                <div
                    key={sign.name}
                    className={`signpost-mount signpost-mount-${sign.side}`}
                    style={{ top: sign.top }}
                >
                    <div className="signpost-sign-bob" style={{ animationDelay: `${i * 0.3}s` }}>
                        <a href={sign.link} className="signpost-sign" aria-label={sign.name}>
                            <img src={sign.img} alt={sign.name} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
