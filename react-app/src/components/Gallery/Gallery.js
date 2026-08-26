import { useEffect, useState } from 'react';
import './Gallery.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import Reveal from '../Reveal/Reveal';
import { Sparkle } from '../Icons/Icons';

import thumb1 from '../../assets/misc/web/thumb/DSC02466.jpg';
import thumb2 from '../../assets/misc/web/thumb/DSC02729.jpg';
import thumb3 from '../../assets/misc/web/thumb/DSC02747.jpg';
import thumb4 from '../../assets/misc/web/thumb/DSCN2836.jpg';
import thumb5 from '../../assets/misc/web/thumb/DSCN2848.jpg';

import full1 from '../../assets/misc/web/DSC02466.jpg';
import full2 from '../../assets/misc/web/DSC02729.jpg';
import full3 from '../../assets/misc/web/DSC02747.jpg';
import full4 from '../../assets/misc/web/DSCN2836.jpg';
import full5 from '../../assets/misc/web/DSCN2848.jpg';

const PHOTOS = [
    { thumb: thumb1, full: full1, caption: 'Opening ceremony: let the hacking begin!' },
    { thumb: thumb2, full: full2, caption: 'Cheering on the final demos' },
    { thumb: thumb3, full: full3, caption: 'Beginner track winners: EcoFlights' },
    { thumb: thumb4, full: full4, caption: 'New friends, new teams' },
    { thumb: thumb5, full: full5, caption: 'Meeting our sponsors' },
];

const ROTATIONS = [-3, 2, -2, 3, -1.5];

export default function Gallery() {
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        if (openIndex === null) return;

        const onKey = (e) => {
            if (e.key === 'Escape') setOpenIndex(null);
            if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % PHOTOS.length);
            if (e.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openIndex]);

    return (
        <section id="gallery" className="section-wrap">
            <SectionHeading
                tag="Flashbacks"
                icon={<Sparkle style={{ width: '14pt' }} />}
                title="Gallery"
                subtitle="A few snapshots from past TigerHacks weekends: opening ceremonies, late-night builds, and the friends made along the way."
            />

            <div className="gallery-grid">
                {PHOTOS.map((photo, i) => (
                    <Reveal key={photo.thumb} delay={i * 0.07}>
                        <button
                            className="polaroid"
                            style={{ '--tilt': `${ROTATIONS[i % ROTATIONS.length]}deg` }}
                            onClick={() => setOpenIndex(i)}
                        >
                            <img src={photo.thumb} alt={photo.caption} loading="lazy" />
                            <span className="polaroid-caption">{photo.caption}</span>
                        </button>
                    </Reveal>
                ))}
            </div>

            {openIndex !== null && (
                <div className="lightbox" onClick={() => setOpenIndex(null)}>
                    <button className="lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close">
                        &times;
                    </button>
                    <button
                        className="lightbox-nav lightbox-prev"
                        aria-label="Previous photo"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
                        }}
                    >
                        &#8249;
                    </button>
                    <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
                        <img src={PHOTOS[openIndex].full} alt={PHOTOS[openIndex].caption} />
                        <figcaption>{PHOTOS[openIndex].caption}</figcaption>
                    </figure>
                    <button
                        className="lightbox-nav lightbox-next"
                        aria-label="Next photo"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenIndex((i) => (i + 1) % PHOTOS.length);
                        }}
                    >
                        &#8250;
                    </button>
                </div>
            )}
        </section>
    );
}
