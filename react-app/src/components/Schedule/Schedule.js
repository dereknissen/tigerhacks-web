import { useEffect, useMemo, useState } from 'react';
import './Schedule.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Clock, Pulse } from '../Icons/Icons';
import Reveal from '../Reveal/Reveal';

/* All event times are the physical, on-the-ground time in Columbia, MO
   (Central), stored with an explicit -05:00 (CDT) offset so the schedule
   reads correctly no matter what timezone a visitor's browser is in —
   only the *display* is localized to America/Chicago below. */
function ct(month, day, hour, minute) {
    const p = (n) => String(n).padStart(2, '0');
    return new Date(`2026-${p(month)}-${p(day)}T${p(hour)}:${p(minute)}:00-05:00`);
}

/* Pixel (pt) height of one hour on the calendar grid — tall enough that
   even a 1-hour block has room to show its location, not just its title.
   MIN_BLOCK_HEIGHT matches that same three-line minimum, so a short block
   (e.g. the 30-minute submission deadline) never clips its own location. */
const HOUR_HEIGHT = 52;
const MIN_BLOCK_HEIGHT = 46;

/* The whole weekend shares one grid, starting at 8 AM each day. */
const GRID_START_HOUR = 8;

/* Fallback block length (minutes) for an event with no explicit duration
   (the last item of a day), so an open-ended item like a late-night
   placeholder doesn't read as "live" until the following morning. */
const DEFAULT_DURATION = 120;

const RAW_DAYS = [
    {
        label: 'Friday',
        date: 'Sept 25',
        day: 25,
        events: [
            { time: ct(9, 25, 16, 0), title: 'Check-in', location: 'Memorial Union', duration: 120 },
            { time: ct(9, 25, 18, 0), title: 'Opening Ceremony', location: 'Memorial Union', duration: 60 },
            { time: ct(9, 25, 19, 30), title: 'Dinner', location: 'Lafferre — Time Capsule Lounge', duration: 60 },
            { time: ct(9, 25, 20, 30), title: 'Team Building', location: 'Lafferre — Ketcham Auditorium', duration: 60 },
            { time: ct(9, 25, 21, 30), title: 'Beginner Orientation', location: 'Lafferre — Ketcham Auditorium', duration: 60 },
            { time: ct(9, 25, 22, 30), title: 'Air Mattress Handouts', location: 'Lafferre — Main Hallway', duration: 30 },
            { time: ct(9, 25, 23, 30), title: 'Event', location: 'TBD' },
        ],
    },
    {
        label: 'Saturday',
        date: 'Sept 26',
        day: 26,
        events: [
            { time: ct(9, 26, 9, 0), title: 'Breakfast', location: 'Lafferre — Time Capsule Lounge', duration: 60 },
            { time: ct(9, 26, 10, 0), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 11, 0), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 12, 30), title: 'Lunch', location: 'Lafferre — Time Capsule Lounge', duration: 60 },
            { time: ct(9, 26, 13, 30), title: 'MLH: Intro to Google AI Studio', location: 'Lafferre — TBD', duration: 60 },
            { time: ct(9, 26, 14, 30), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 15, 30), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 16, 30), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 18, 0), title: 'Dinner', location: 'Lafferre — Time Capsule Lounge', duration: 60 },
            { time: ct(9, 26, 19, 0), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 20, 0), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 21, 0), title: 'DevelopHer', location: 'Lafferre — TBD', duration: 60 },
            { time: ct(9, 26, 22, 0), title: 'Event', location: 'TBD' },
            { time: ct(9, 26, 23, 30), title: 'Late-Night Snack', location: 'Lafferre — Time Capsule Lounge' },
        ],
    },
    {
        label: 'Sunday',
        date: 'Sept 27',
        day: 27,
        events: [
            { time: ct(9, 27, 8, 0), title: 'Breakfast', location: 'Lafferre — Time Capsule Lounge', duration: 60 },
            { time: ct(9, 27, 9, 0), title: 'Devpost Office Hour', location: 'Lafferre — Main Hallway', duration: 60 },
            { time: ct(9, 27, 10, 0), title: 'Submission Close', location: 'Lafferre', duration: 30 },
            { time: ct(9, 27, 11, 0), title: 'Lunch', location: 'Lafferre — Time Capsule Lounge', duration: 60 },
            { time: ct(9, 27, 12, 0), title: 'Judging — Session 1', location: 'Memorial Union — Stotler', duration: 90 },
            { time: ct(9, 27, 14, 0), title: 'Judging — Session 2', location: 'Memorial Union — Stotler', duration: 90 },
            { time: ct(9, 27, 16, 0), title: 'Closing Ceremony', location: 'Memorial Union — Stotler', duration: 60 },
        ],
    },
];

/* Slots still titled just "Event" are unannounced placeholders — hide them
   until they have a real name, rather than showing a wall of blank rows.
   Each remaining event gets its own fixed block length (falling back to
   DEFAULT_DURATION) instead of stretching to fill whatever gap is left
   after hiding placeholders, so block size stays a true read of how long
   something runs rather than an artifact of the data around it. */
const NAMED_DAYS = RAW_DAYS.map((day) => ({
    ...day,
    anchor: ct(9, day.day, GRID_START_HOUR, 0),
    events: day.events
        .filter((event) => event.title !== 'Event')
        .map((event) => ({
            ...event,
            end: new Date(event.time.getTime() + (event.duration || DEFAULT_DURATION) * 60000),
        })),
}));

/* One shared grid for the whole weekend: 8 AM each day down to whichever
   day runs latest, so all three columns line up on the same hour rows. */
const TOTAL_HOURS = Math.ceil(
    Math.max(
        ...NAMED_DAYS.map((day) => {
            const latestEnd = day.events.reduce((max, e) => (e.end > max ? e.end : max), day.events[0].end);
            return (latestEnd - day.anchor) / 3600000;
        })
    )
);

const HOUR_MARKS = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => new Date(NAMED_DAYS[0].anchor.getTime() + i * 3600000));

const DAYS = NAMED_DAYS;
const GRID_HEIGHT = TOTAL_HOURS * HOUR_HEIGHT;

const ALL_EVENTS = DAYS.flatMap((day) => day.events.map((event) => ({ ...event, day: day.label })));

function useNow(intervalMs = 30000) {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(id);
    }, [intervalMs]);
    return now;
}

function formatTime(date) {
    return date
        .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' })
        .replace(':00 ', ' ');
}

function offsetFor(day, date) {
    return ((date - day.anchor) / 3600000) * HOUR_HEIGHT;
}

/* Loosely categorizes each event so the calendar can color-code blocks the
   way a real calendar app would — meals, headline moments, onboarding,
   and community/submission events each read as their own group at a
   glance. */
function categoryFor(title) {
    const t = title.toLowerCase();
    if (/breakfast|lunch|dinner|snack/.test(t)) return 'meal';
    if (/ceremony|judging/.test(t)) return 'headline';
    if (/check-in|orientation|team building/.test(t)) return 'onboarding';
    return 'community';
}

export default function Schedule() {
    const now = useNow();

    const nextEvent = useMemo(() => ALL_EVENTS.find((e) => e.time > now) || null, [now]);
    const liveEvent = useMemo(() => ALL_EVENTS.find((e) => now >= e.time && now < e.end) || null, [now]);
    const eventOver = now >= ALL_EVENTS[ALL_EVENTS.length - 1].end;

    let bannerText;
    if (eventOver) {
        bannerText = "That's a wrap — thanks for hacking with us!";
    } else if (liveEvent) {
        bannerText = `Happening now: ${liveEvent.title} (${liveEvent.day}, ${formatTime(liveEvent.time)})`;
    } else if (nextEvent) {
        bannerText = `Up next: ${nextEvent.title} (${nextEvent.day}, ${formatTime(nextEvent.time)})`;
    } else {
        bannerText = 'See you on campus!';
    }

    return (
        <section id="schedule" className="section-wrap">
            <SectionHeading
                tag="Live schedule"
                icon={<Clock style={{ width: '14pt' }} />}
                title="Event Schedule"
                subtitle="Everything happening across the weekend, updated live as the event runs."
            />

            <Reveal className="schedule-banner paper-card">
                {liveEvent && !eventOver && <Pulse className="schedule-banner-pulse" style={{ width: '14pt' }} />}
                <span>{bannerText}</span>
            </Reveal>

            <Reveal className="schedule-week paper-card">
                <div className="schedule-week-scroll">
                    <div className="schedule-week-header">
                        <div className="schedule-week-gutter-spacer" />
                        {DAYS.map((day) => {
                            const isToday = now >= day.events[0].time && now < day.events[day.events.length - 1].end;
                            return (
                                <div key={day.label} className={`schedule-week-day-label ${isToday ? 'schedule-week-day-label-today' : ''}`}>
                                    {isToday && <span className="schedule-tab-dot" aria-hidden="true" />}
                                    {day.label}
                                    <span className="schedule-tab-date">{day.date}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="schedule-week-body" style={{ height: `${GRID_HEIGHT}pt` }}>
                        <div className="schedule-gutter">
                            {HOUR_MARKS.map((mark, i) => (
                                <span key={mark.toISOString()} className="schedule-hour-label" style={{ top: `${i * HOUR_HEIGHT}pt` }}>
                                    {formatTime(mark)}
                                </span>
                            ))}
                        </div>

                        {DAYS.map((day) => {
                            const isToday = now >= day.events[0].time && now < day.events[day.events.length - 1].end;
                            return (
                                <div key={day.label} className="schedule-week-column">
                                    {HOUR_MARKS.map((mark, i) => (
                                        <div key={mark.toISOString()} className="schedule-hour-line" style={{ top: `${i * HOUR_HEIGHT}pt` }} />
                                    ))}

                                    {day.events.map((event) => {
                                        const isLive = now >= event.time && now < event.end;
                                        const isNext = nextEvent && event.time.getTime() === nextEvent.time.getTime() && event.title === nextEvent.title;
                                        const isPast = now >= event.end;
                                        const top = offsetFor(day, event.time);
                                        const height = Math.max(offsetFor(day, event.end) - top, MIN_BLOCK_HEIGHT);
                                        return (
                                            <div
                                                key={`${event.title}-${event.time.toISOString()}`}
                                                className={`schedule-event schedule-event-${categoryFor(event.title)} ${isLive ? 'schedule-event-live' : ''} ${isPast ? 'schedule-event-past' : ''}`}
                                                style={{ top: `${top}pt`, height: `${height}pt` }}
                                            >
                                                <span className="schedule-event-time">{formatTime(event.time)}</span>
                                                <span className="schedule-event-title">{event.title}</span>
                                                {event.location && <span className="schedule-event-location">{event.location}</span>}
                                                {isLive && <span className="schedule-event-badge schedule-event-badge-live">Now</span>}
                                                {!isLive && isNext && <span className="schedule-event-badge schedule-event-badge-next">Next</span>}
                                            </div>
                                        );
                                    })}

                                    {isToday && (
                                        <div className="schedule-now-line" style={{ top: `${offsetFor(day, now)}pt` }}>
                                            <span className="schedule-now-dot" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
