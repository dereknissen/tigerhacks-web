import './Rubric.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Trophy } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';

const CRITERIA = [
    {
        name: 'Technical & User Experience',
        color: '#FAC3B4',
        description:
            "How well was the project technically executed? Does the project work as intended? We'll consider code quality, appropriate use of technologies, technical complexity, demo functionality, bugs or broken features, ease of use, and how natural and intuitive the interaction is.",
    },
    {
        name: 'Creativity',
        color: '#ADADEF',
        description: 'Is the idea unique or unexpected? Does it approach a medical problem from a fresh perspective?',
    },
    {
        name: 'Health/Medical Impact',
        color: '#D1D1FF',
        description:
            'Does the project address a meaningful healthcare, medical, or wellness problem? Is the proposed solution relevant to a real need?',
    },
    {
        name: 'Presentation',
        color: '#E0AD70',
        description: 'How well is the project presented?',
    },
];

export default function Rubric() {
    return (
        <section id="rubric" className="section-wrap">
            <SectionHeading
                tag="How you'll be judged"
                icon={<Trophy style={{ width: '14pt' }} />}
                title="Judging Rubric"
                subtitle="Every project is scored against the same four categories, no matter which track you build in."
            />

            <div className="rubric-grid">
                {CRITERIA.map((item, i) => (
                    <Reveal
                        key={item.name}
                        delay={i * 0.1}
                        className="rubric-card paper-card"
                        style={{ '--rubric-color': item.color }}
                    >
                        <span className="rubric-number">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="rubric-name">{item.name}</h3>
                        <p className="rubric-desc">{item.description}</p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
