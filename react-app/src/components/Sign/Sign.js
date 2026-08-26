import './Sign.css';

export default function Sign({ img, name, link }) {
    return (
        <a className="sign" href={link} aria-label={name}>
            <img src={img} className="sign-img" alt={name} />
        </a>
    );
}
