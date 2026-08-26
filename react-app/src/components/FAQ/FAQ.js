import { useState } from 'react';
import './FAQ.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Leaf } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';

const QUESTIONS = [
    {
        q: 'Who can attend TigerHacks?',
        a: 'Any current student, from any school, at any skill level! Whether you have never written a line of code or you hack every weekend, there is a place for you here.',
    },
    {
        q: 'How much does it cost?',
        a: 'Nothing! Registration is completely free, and meals, snacks, and swag are provided all weekend long.',
    },
    {
        q: 'Do I need a team?',
        a: 'Nope. You can register with a team of up to 4, or come solo. We will host a team-formation mixer at the start of the event to help you find teammates.',
    },
    {
        q: "I've never hacked before. Is that okay?",
        a: 'Absolutely, beginners are half of who we build this event for. We run workshops all weekend and mentors are always wandering around to help.',
    },
    {
        q: 'What should I bring?',
        a: 'Your laptop and charger, a student ID, a water bottle, and anything you need to be comfortable overnight (blanket, pillow, toothbrush). We\'ll provide the rest.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="section-wrap">
            <SectionHeading
                tag="Good to know"
                icon={<Leaf style={{ width: '14pt' }} />}
                title="Frequently Asked Questions"
            />

            <div className="faq-list">
                {QUESTIONS.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <Reveal key={item.q} delay={index * 0.07} className={`faq-item paper-card ${isOpen ? 'faq-item-open' : ''}`}>
                            <button className="faq-question" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                                <span>{item.q}</span>
                                <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                            </button>
                            {isOpen && <p className="faq-answer">{item.a}</p>}
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
