import './Sponsors.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Bell } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';

const TIERS = [
    { name: 'Presenting Sponsor', slots: 1, size: 'lg' },
    { name: 'Gold Sponsors', slots: 3, size: 'md' },
    { name: 'Silver Sponsors', slots: 4, size: 'sm' },
];

export default function Sponsors() {
    return (
        <section id="sponsors" className="section-wrap">
            <SectionHeading
                tag="Our supporters"
                icon={<Bell style={{ width: '14pt' }} />}
                title="Sponsors"
                subtitle="TigerHacks is made possible by generous sponsors who believe in student builders. Interested in joining them?"
            />

            <div className="sponsor-tiers">
                {TIERS.map((tier) => (
                    <div key={tier.name} className="sponsor-tier">
                        <p className="sponsor-tier-name">{tier.name}</p>
                        <div className="sponsor-row">
                            {Array.from({ length: tier.slots }).map((_, i) => (
                                <Reveal
                                    key={i}
                                    delay={i * 0.06}
                                    className={`sponsor-frame sponsor-frame-${tier.size} paper-card`}
                                >
                                    <span>Your Logo Here</span>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Reveal className="sponsor-cta wood-panel">
                <p className="sponsor-cta-text">Want to sponsor TigerHacks 2026 and meet hundreds of student hackers?</p>
                <a className="btn btn-outline" href="mailto:tigerhacks@missouri.edu">Become a Sponsor</a>
            </Reveal>
        </section>
    );
}
