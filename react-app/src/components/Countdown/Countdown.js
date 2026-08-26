import { useEffect, useState } from 'react';
import './Countdown.css';
import { Heart } from '../Icons/Icons';

/* Hacking begins at midnight on the first day of the event. */
const EVENT_START = new Date('2026-09-25T00:00:00');

function getTimeLeft() {
    const diff = Math.max(0, EVENT_START.getTime() - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        done: diff === 0,
    };
}

function pad(n) {
    return String(n).padStart(2, '0');
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="countdown-card paper-card">
            {timeLeft.done ? (
                <p className="countdown-caption countdown-caption-big">The island is open. Hacking has begun!</p>
            ) : (
                <>
                    <div className="countdown-header">
                        <span className="countdown-header-line" aria-hidden="true" />
                        <span className="countdown-header-text">until hacking begins!</span>
                        <span className="countdown-header-line" aria-hidden="true" />
                    </div>
                    <div className="countdown-digits">
                        <div className="countdown-cell">
                            <span className="countdown-num">{pad(timeLeft.days)}</span>
                            <span className="countdown-label">days</span>
                        </div>
                        <span className="countdown-dot" aria-hidden="true" />
                        <div className="countdown-cell">
                            <span className="countdown-num">{pad(timeLeft.hours)}</span>
                            <span className="countdown-label">hrs</span>
                        </div>
                        <span className="countdown-dot" aria-hidden="true" />
                        <div className="countdown-cell">
                            <span className="countdown-num">{pad(timeLeft.minutes)}</span>
                            <span className="countdown-label">min</span>
                        </div>
                        <span className="countdown-dot" aria-hidden="true" />
                        <div className="countdown-cell">
                            <span className="countdown-num">{pad(timeLeft.seconds)}</span>
                            <span className="countdown-label">sec</span>
                        </div>
                    </div>
                    <div className="countdown-footer" aria-hidden="true">
                        <span className="countdown-footer-line" />
                        <Heart style={{ width: '12pt' }} />
                        <span className="countdown-footer-line" />
                    </div>
                </>
            )}
        </div>
    );
}
