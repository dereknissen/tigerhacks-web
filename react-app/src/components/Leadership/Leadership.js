import './Leadership.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { PawPrint } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';
import AshtonPhoto from '../../assets/portraits/ashton.jpeg';
import QuinnPhoto from '../../assets/portraits/quinn.png';
import GinaPhoto from '../../assets/portraits/gina.jpeg';
import ElisePhoto from '../../assets/portraits/elise.jpeg';
import DerekPhoto from '../../assets/portraits/derek.jpeg';

const AVATAR_COLORS = ['#FAC3B4', '#D1D1FF', '#ADADEF', '#F2977E', '#7373D9', '#E2574C'];

const LEADERS = [
    { name: 'Ashton Wooster', role: 'Chair', photo: AshtonPhoto },
    { name: 'Quinn DeCota', role: 'Finance Lead', photo: QuinnPhoto },
    { name: 'Gina Hua', role: 'Marketing Lead', photo: GinaPhoto },
    { name: 'LeeAnn Lin', role: 'HackerX Lead' },
    { name: 'Elise Fidler', role: 'Logistics Lead', photo: ElisePhoto },
    { name: 'Derek Nissen', role: 'Technology Lead', photo: DerekPhoto },
];

function initials(name) {
    return name.split(' ').map((part) => part[0]).join('');
}

export default function Leadership() {
    return (
        <section id="leadership" className="section-wrap">
            <SectionHeading
                tag="Meet the team"
                icon={<PawPrint style={{ width: '14pt' }} />}
                title="Leadership"
                subtitle="The team behind TigerHacks 2026, planning the weekend all year long."
            />

            <div className="leadership-grid">
                {LEADERS.map((leader, i) => (
                    <Reveal key={leader.name} delay={i * 0.05} className="leader-card paper-card">
                        {leader.photo ? (
                            <img src={leader.photo} alt={leader.name} className="leader-photo" />
                        ) : (
                            <div className="leader-avatar" style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                                {initials(leader.name)}
                            </div>
                        )}
                        <h3 className="leader-name">{leader.name}</h3>
                        <p className="leader-role">{leader.role}</p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
