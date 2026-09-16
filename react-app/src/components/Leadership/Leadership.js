import './Leadership.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { PawPrint } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';
import AshtonPhoto from '../../assets/portraits/ashton.jpeg';
import QuinnPhoto from '../../assets/portraits/quinn.png';
import GinaPhoto from '../../assets/portraits/gina.jpeg';
import ElisePhoto from '../../assets/portraits/elise.jpeg';
import DerekPhoto from '../../assets/portraits/derek.jpeg';
import LeeAnnPhoto from '../../assets/portraits/leeann.jpg';
import KatelynPhoto from '../../assets/portraits/katelyn.png';
import KrishnaPhoto from '../../assets/portraits/krishna.png';
import SydneyPhoto from '../../assets/portraits/sydney.png';
import TsinatPhoto from '../../assets/portraits/tsinat.jpeg';
import MickyPhoto from '../../assets/portraits/micky.jpeg';
import JackPhoto from '../../assets/portraits/jeveker.jpg';

const AVATAR_COLORS = ['#FAC3B4', '#D1D1FF', '#ADADEF', '#F2977E', '#7373D9', '#E2574C'];

const LEADERS = [
    { name: 'Ashton Wooster', role: 'Chair', photo: AshtonPhoto },
    { name: 'Quinn DeCota', role: 'Finance Lead', photo: QuinnPhoto },
    { name: 'Gina Hua', role: 'Marketing Lead', photo: GinaPhoto },
    { name: 'LeeAnn Lin', role: 'HackerX Lead', photo: LeeAnnPhoto },
    { name: 'Elise Fidler', role: 'Logistics Lead', photo: ElisePhoto },
    { name: 'Derek Nissen', role: 'Technology Lead', photo: DerekPhoto },
    { name: 'Katelyn Van Dyke', role: 'HackerX', photo: KatelynPhoto },
    { name: 'Krishna Karra', role: 'HackerX', photo: KrishnaPhoto },
    { name: 'Sydney Belter', role: 'Marketing', photo: SydneyPhoto },
    { name: 'Jack Eveker', role: 'Marketing', photo: JackPhoto },
    { name: 'Tsinat Mitiku', role: 'Logistics', photo: TsinatPhoto },
    { name: 'Micky Sheridan', role: 'Logistics', photo: MickyPhoto },
];

function initials(name) {
    return name.split(' ').map((part) => part[0]).join('');
}

function PersonCard({ person, index }) {
    return (
        <Reveal delay={index * 0.05} className="leader-card paper-card">
            {person.photo ? (
                <img src={person.photo} alt={person.name} className="leader-photo" />
            ) : (
                <div className="leader-avatar" style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}>
                    {initials(person.name)}
                </div>
            )}
            <h3 className="leader-name">{person.name}</h3>
            <p className="leader-role">{person.role}</p>
        </Reveal>
    );
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
                    <PersonCard key={leader.name} person={leader} index={i} />
                ))}
            </div>
        </section>
    );
}
