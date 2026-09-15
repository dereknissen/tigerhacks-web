import './Sponsors.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Bell } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';

import ShelterLogo from '../../assets/sponsors/shelter.jpeg';
import ReplyLogo from '../../assets/sponsors/reply.webp';
import HrBlockLogo from '../../assets/sponsors/hrblock.png';

const TIERS = [
    {
        name: 'Silver Sponsors',
        size: 'md',
        sponsors: [
            { name: 'Shelter Insurance', logo: ShelterLogo, scale: 1.35 },
            { name: 'HR Block', logo: HrBlockLogo },
        ],
    },
    {
        name: 'Bronze Sponsors',
        size: 'sm',
        sponsors: [
            { name: 'Reply', logo: ReplyLogo },
        ],
    },
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
                            {tier.sponsors.map((sponsor, i) => (
                                <Reveal
                                    key={sponsor.name}
                                    delay={i * 0.06}
                                    className={`sponsor-frame sponsor-frame-${tier.size} sponsor-frame-filled paper-card`}
                                >
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="sponsor-logo"
                                        style={sponsor.scale ? { transform: `scale(${sponsor.scale})` } : undefined}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
