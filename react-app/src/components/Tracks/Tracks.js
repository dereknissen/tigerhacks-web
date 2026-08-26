import './Tracks.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Bell, PawPrint, Sparkle } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';

const TRACKS = [
    {
        name: 'Beginner',
        color: '#FAC3B4',
        icon: <Bell style={{ width: '30pt' }} />,
        description: "New to hacking? This category is judged separately so first-timers can shine.",
    },
    {
        name: 'Developer',
        color: '#D1D1FF',
        icon: <PawPrint color="#7373D9" style={{ width: '30pt' }} />,
        description: 'Bring your skills and build something ambitious, judged on technical depth and polish.',
    },
    {
        name: 'Game Dev',
        color: '#ADADEF',
        icon: <Sparkle color="#ADADEF" style={{ width: '30pt' }} />,
        description: 'Building something playable? This category celebrates the best game, big or small.',
    },
];

export default function Tracks() {
    return (
        <section id="tracks" className="section-wrap">
            <SectionHeading
                tag="Pick your path"
                icon={<PawPrint color="#423C38" style={{ width: '14pt' }} />}
                title="Tracks & Prizes"
                subtitle="Every team submits under one of these three categories. Pick whichever fits how you're building this weekend."
            />

            <div className="tracks-grid">
                {TRACKS.map((track, i) => (
                    <Reveal
                        key={track.name}
                        delay={i * 0.1}
                        className="track-card paper-card"
                        style={{ '--track-color': track.color }}
                    >
                        <div className="track-icon">{track.icon}</div>
                        <h3 className="track-name">{track.name}</h3>
                        <p className="track-desc">{track.description}</p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
