/* MLH Trust Badge — required on the hackathon's main site for the 2026
   season. Pinned top-right on every page; markup mirrors the official
   snippet from mlh.io so the styling stays exactly as MLH expects. */
export default function MlhBadge() {
    return (
        <a
            id="mlh-trust-badge"
            style={{
                display: 'block',
                maxWidth: '100px',
                minWidth: '60px',
                position: 'fixed',
                right: '50px',
                top: 0,
                width: '10%',
                zIndex: 10000,
            }}
            href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
                alt="Major League Hacking 2026 Hackathon Season"
                style={{ width: '100%' }}
            />
        </a>
    );
}
