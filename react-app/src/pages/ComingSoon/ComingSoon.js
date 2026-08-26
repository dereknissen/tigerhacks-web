import Logo from '../../assets/logo/tigerhacks-color.png';

export default function ComingSoon() {
    return (
        <div style={{
            background: 'linear-gradient(180deg, var(--ac-sky-top) 0%, var(--ac-sky-bottom) 100%)',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '14pt',
        }}>
            <img style={{ width: '140px' }} src={Logo} alt="TigerHacks logo" />
            <h1>Coming Soon</h1>
            <p style={{ fontSize: '12pt' }}>We're planting the seeds for something great.</p>
        </div>
    )
}