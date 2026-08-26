import './About.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Leaf, Clock, People, Trophy, Sparkle, Heart } from '../Icons/Icons';
import Parallax from '../Parallax/Parallax';
import Reveal from '../Reveal/Reveal';
import HealthBackground from '../../assets/theme/health-background.png';

const STATS = [
    { value: '36', label: 'hours of hacking', icon: Clock, color: '#FAC3B4' },
    { value: '300+', label: 'hackers expected', icon: People, color: '#D1D1FF' },
    { value: '$10k+', label: 'in prizes', icon: Trophy, color: '#E2574C' },
    { value: '1', label: 'unforgettable weekend', icon: Sparkle, color: '#ADADEF' },
];

export default function About() {
    return (
        <section id="about" className="section-wrap about-section">
            <div className="about-dotgrid" aria-hidden="true"></div>
            <Parallax speed={0.12} className="about-watermark-wrap">
                <img src={HealthBackground} className="about-watermark" alt="" />
            </Parallax>
            <SectionHeading
                tag="About the island"
                icon={<Leaf style={{ width: '14pt' }} />}
                title="What is TigerHacks?"
                subtitle="TigerHacks is Mizzou's biggest hackathon: a cozy, welcoming weekend where students of every skill level gather to build, learn, and ship something new. Grab your friends, pitch a tent on our island, and spend the weekend bringing your idea to life."
            />

            <p className="about-theme-callout">
                <Heart className="about-theme-callout-icon" style={{ width: '16pt' }} />
                This year's theme is <strong>Health</strong>: build tools, apps, or experiences that help people live healthier lives.
            </p>

            <div className="about-stats">
                {STATS.map((stat, i) => (
                    <Reveal key={stat.label} delay={i * 0.08} className="about-stat paper-card">
                        <stat.icon className="about-stat-icon" color={stat.color} />
                        <p className="about-stat-value">{stat.value}</p>
                        <p className="about-stat-label">{stat.label}</p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
