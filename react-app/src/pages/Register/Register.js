import { useState } from 'react';
import './Register.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { FormSection, TextField, TextAreaField, SelectField, AutocompleteField, ChipGroup, FileField, CheckboxField } from '../../components/Form/Fields';
import { PawPrint, Bell, Leaf, Compass, Heart, People } from '../../components/Icons/Icons';
import { COUNTRIES } from '../../config/countries';
import { SCHOOLS } from '../../config/schools';
import { submitRegistration } from '../../config/registration';

const LEVEL_OF_STUDY_OPTIONS = [
    'Less than Secondary / High School',
    'Secondary / High School',
    'Undergraduate University (2 year - community college or similar)',
    'Undergraduate University (3+ year)',
    'Graduate University (Masters, Professional, Doctoral, etc)',
    'Code School / Bootcamp',
    'Other Vocational / Trade Program or Apprenticeship',
    'Post Doctorate',
    'Other',
    "I'm not currently a student",
    'Prefer not to answer',
];
const UNDERGRAD_LEVELS_OF_STUDY = [
    'Undergraduate University (2 year - community college or similar)',
    'Undergraduate University (3+ year)',
];
const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const HEARD_ABOUT_OPTIONS = [
    'Instagram', 'Discord', 'Friend or Classmate', 'Professor or Class Announcement',
    'Flyer or Poster on Campus', 'TigerHacks Website', 'Other',
];
const MAX_TEAMMATES = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const MIN_AGE = 13;
const MAX_AGE = 100;
const SCHOOL_SET = new Set(SCHOOLS);
const RESUME_EXT_RE = /\.(pdf|doc|docx)$/i;
const RESUME_MAX_BYTES = 10 * 1024 * 1024;
const RESUME_ACCEPT = [
    '.pdf', '.doc', '.docx',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
].join(',');

const emptyValues = {
    firstName: '', lastName: '', email: '', phone: '', age: '',
    school: '', levelOfStudy: '', major: '', discord: '',
    teammates: [],
    judgingCategory: '', shirtSize: '', dietary: '',
    heardAbout: '', heardAboutOther: '', linkedin: '', country: '',
    resume: null,
    mlhCodeOfConduct: false, mlhDataSharing: false, mlhMarketing: false,
};

export default function Register() {
    const [values, setValues] = useState(emptyValues);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const set = (key) => (e) => {
        const val = e && e.target ? e.target.value : e;
        setValues((v) => ({ ...v, [key]: val }));
    };

    const addTeammate = () => {
        if (values.teammates.length >= MAX_TEAMMATES) return;
        setValues((v) => ({ ...v, teammates: [...v.teammates, { name: '', email: '' }] }));
    };

    const removeTeammate = (i) => {
        setValues((v) => ({ ...v, teammates: v.teammates.filter((_, idx) => idx !== i) }));
    };

    const setResume = (e) => {
        const file = e.target.files && e.target.files[0];
        setValues((v) => ({ ...v, resume: file || null }));
    };

    const toggle = (key) => (e) => {
        const checked = e.target.checked;
        setValues((v) => ({ ...v, [key]: checked }));
    };

    const updateTeammate = (i, key, val) => {
        setValues((v) => ({
            ...v,
            teammates: v.teammates.map((t, idx) => (idx === i ? { ...t, [key]: val } : t)),
        }));
    };

    const validate = () => {
        const e = {};
        if (!values.firstName.trim()) e.firstName = 'Please enter your first name.';
        if (!values.lastName.trim()) e.lastName = 'Please enter your last name.';
        if (!values.email.trim()) e.email = 'Please enter your email.';
        else if (!EMAIL_RE.test(values.email)) e.email = 'That email doesn\'t look right.';
        if (!values.phone.trim()) e.phone = 'Please enter your phone number.';
        else if (!PHONE_RE.test(values.phone)) e.phone = 'That phone number doesn\'t look right.';
        if (!values.age) e.age = 'Please enter your age.';
        else if (!Number.isInteger(Number(values.age)) || values.age < MIN_AGE || values.age > MAX_AGE) {
            e.age = `Age must be a number between ${MIN_AGE} and ${MAX_AGE}.`;
        }
        if (!values.school.trim()) e.school = 'Please select your school.';
        else if (!SCHOOL_SET.has(values.school)) e.school = 'Please pick your school from the list.';
        if (!values.levelOfStudy) e.levelOfStudy = 'Please select your level of study.';
        if (!values.major.trim()) e.major = 'Please enter your major.';
        if (!values.discord.trim()) e.discord = 'Please enter your Discord username.';
        if (!values.judgingCategory) e.judgingCategory = 'Please pick a judging category.';
        if (!values.shirtSize) e.shirtSize = 'Please select a shirt size.';
        if (!values.heardAbout) e.heardAbout = 'Please let us know how you heard about us.';
        if (!values.country) e.country = 'Please select your country of residence.';

        if (!values.resume) e.resume = 'Please attach your resume.';
        else if (!RESUME_EXT_RE.test(values.resume.name)) e.resume = 'Resume must be a PDF, DOC, or DOCX file.';
        else if (values.resume.size > RESUME_MAX_BYTES) e.resume = 'Resume must be under 10 MB.';

        if (!values.mlhCodeOfConduct) e.mlhCodeOfConduct = 'You must agree to the MLH Code of Conduct.';
        if (!values.mlhDataSharing) e.mlhDataSharing = 'You must authorize sharing your information with MLH.';

        values.teammates.forEach((t, i) => {
            if (t.email && !EMAIL_RE.test(t.email)) {
                e[`teammate${i}Email`] = 'That email doesn\'t look right.';
            }
        });

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) {
            document.querySelector('.field-invalid')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        }

        setStatus('submitting');
        try {
            await submitRegistration(values);
            await new Promise((r) => setTimeout(r, 500));
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div>
                <Navbar />
                <section className="section-wrap register-success">
                    <div className="paper-card register-success-card">
                        <Heart className="ac-bounce" style={{ width: '50pt' }} />
                        <h1 className="section-heading">You're registered!</h1>
                        <p>
                            Keep an eye on your inbox for a confirmation email. In the meantime, come say hi on
                            Discord, that's how we'll share updates throughout the weekend.
                        </p>
                        <a className="btn" href="https://discord.gg/NwsWUB7Fp9" target="_blank" rel="noreferrer">
                            Join the Discord
                        </a>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <section className="section-wrap register-wrap">
                <SectionHeading
                    tag="Save your spot"
                    icon={<Leaf style={{ width: '14pt' }} />}
                    title="Register for TigerHacks 2026"
                    subtitle="Fill out the packet below to save your spot. It only takes a few minutes, and it's completely free."
                />

                <form onSubmit={handleSubmit} noValidate>
                    <FormSection icon={<PawPrint style={{ width: '20pt' }} />} title="Who are you?">
                        <div className="field-row">
                            <TextField
                                id="firstName" label="First Name" required
                                value={values.firstName} onChange={set('firstName')} error={errors.firstName}
                            />
                            <TextField
                                id="lastName" label="Last Name" required
                                value={values.lastName} onChange={set('lastName')} error={errors.lastName}
                            />
                        </div>
                        <TextField
                            id="email" label="Email" type="email" required
                            hint="We'll send your confirmation and event updates here"
                            value={values.email} onChange={set('email')} error={errors.email}
                        />
                        <div className="field-row">
                            <TextField
                                id="phone" label="Phone Number" type="tel" required
                                placeholder="(555) 123-4567"
                                value={values.phone} onChange={set('phone')} error={errors.phone}
                            />
                            <TextField
                                id="age" label="Age" type="number" required
                                min={MIN_AGE} max={MAX_AGE}
                                value={values.age} onChange={set('age')} error={errors.age}
                            />
                        </div>
                        <AutocompleteField
                            id="school" label="School" required
                            options={SCHOOLS} placeholder="Start typing your school's name..."
                            hint="Pick from MLH's verified school list so we get uniform data"
                            value={values.school}
                            onChange={(v) => setValues((s) => ({ ...s, school: v }))}
                            error={errors.school}
                        />
                        <SelectField
                            id="levelOfStudy" label="Level of Study" required
                            options={LEVEL_OF_STUDY_OPTIONS}
                            value={values.levelOfStudy} onChange={set('levelOfStudy')}
                            error={errors.levelOfStudy}
                        />
                        {values.levelOfStudy && !UNDERGRAD_LEVELS_OF_STUDY.includes(values.levelOfStudy) && (
                            <div className="field-warning">
                                Heads up, TigerHacks is open to undergraduate students. If that's not you, reach
                                out to us before registering so we can help figure out if you're still eligible.
                            </div>
                        )}
                        <TextField
                            id="major" label="Major" required
                            value={values.major} onChange={set('major')} error={errors.major}
                        />
                        <TextField
                            id="discord" label="Discord Username" required hint="e.g. yourname or yourname#1234"
                            value={values.discord} onChange={set('discord')} error={errors.discord}
                        />
                        <SelectField
                            id="country" label="Country of Residence" required
                            options={COUNTRIES} value={values.country} onChange={set('country')}
                            error={errors.country}
                        />
                    </FormSection>

                    <FormSection
                        icon={<Bell style={{ width: '20pt' }} />}
                        title="Your Crew"
                        description="Registering with a team? List your teammates below. This doesn't lock in your roster, it just helps us plan."
                    >
                        {values.teammates.map((t, i) => (
                            <div className="teammate-row" key={i}>
                                <TextField
                                    id={`teammate${i}Name`} label={`Teammate ${i + 1} Name`}
                                    value={t.name} onChange={(e) => updateTeammate(i, 'name', e.target.value)}
                                />
                                <TextField
                                    id={`teammate${i}Email`} label={`Teammate ${i + 1} Email`} type="email"
                                    value={t.email} onChange={(e) => updateTeammate(i, 'email', e.target.value)}
                                    error={errors[`teammate${i}Email`]}
                                />
                                <button type="button" className="teammate-remove" onClick={() => removeTeammate(i)} aria-label="Remove teammate">
                                    &times;
                                </button>
                            </div>
                        ))}
                        {values.teammates.length < MAX_TEAMMATES && (
                            <button type="button" className="btn btn-outline add-teammate-btn" onClick={addTeammate}>
                                + Add a Teammate
                            </button>
                        )}
                    </FormSection>

                    <FormSection icon={<Leaf style={{ width: '20pt' }} />} title="Hackathon Preferences">
                        <ChipGroup
                            label="Judging Category" required name="judgingCategory"
                            options={['Developer', 'Beginner', 'Game Dev']}
                            hint="New to hacking? Pick Beginner: it's judged separately so first-timers can shine. This is just an estimate — you won't be locked into this category on hackathon day."
                            value={values.judgingCategory}
                            onChange={(v) => setValues((s) => ({ ...s, judgingCategory: v }))}
                            error={errors.judgingCategory}
                        />
                        <SelectField
                            id="shirtSize" label="Shirt Size" required options={SHIRT_SIZES}
                            value={values.shirtSize} onChange={set('shirtSize')} error={errors.shirtSize}
                        />
                        <TextAreaField
                            id="dietary" label="Dietary Restrictions"
                            hint="e.g. vegetarian, gluten-free, nut allergy, leave blank if none"
                            value={values.dietary} onChange={set('dietary')}
                        />
                    </FormSection>

                    <FormSection icon={<Compass style={{ width: '20pt' }} />} title="Logistics">
                        <SelectField
                            id="heardAbout" label="How did you hear about us?" required
                            options={HEARD_ABOUT_OPTIONS} value={values.heardAbout} onChange={set('heardAbout')}
                            error={errors.heardAbout}
                        />
                        {values.heardAbout === 'Other' && (
                            <TextField
                                id="heardAboutOther" label="Please specify"
                                value={values.heardAboutOther} onChange={set('heardAboutOther')}
                            />
                        )}
                        <TextField
                            id="linkedin" label="LinkedIn Profile" type="url"
                            hint="Optional, but sponsors love seeing them!"
                            placeholder="https://linkedin.com/in/..."
                            value={values.linkedin} onChange={set('linkedin')}
                        />
                        <FileField
                            id="resume" label="Resume" required
                            accept={RESUME_ACCEPT}
                            hint="PDF, DOC, or DOCX, up to 10 MB. Shared with our sponsors for recruiting."
                            fileName={values.resume?.name}
                            onChange={setResume}
                            error={errors.resume}
                        />

                        <p className="discord-reminder">
                            🎮 Haven't joined our Discord yet? It's how we'll communicate with you throughout the
                            event: <a href="https://discord.gg/NwsWUB7Fp9" target="_blank" rel="noreferrer">join here</a>.
                        </p>
                    </FormSection>

                    <FormSection
                        icon={<People style={{ width: '20pt' }} />}
                        title="MLH Partnership"
                        description="We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared."
                    >
                        <CheckboxField
                            id="mlhCodeOfConduct" required
                            checked={values.mlhCodeOfConduct} onChange={toggle('mlhCodeOfConduct')}
                            error={errors.mlhCodeOfConduct}
                            label={<>
                                I have read and agree to the{' '}
                                <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noreferrer">
                                    MLH Code of Conduct
                                </a>.
                            </>}
                        />
                        <CheckboxField
                            id="mlhDataSharing" required
                            checked={values.mlhDataSharing} onChange={toggle('mlhDataSharing')}
                            error={errors.mlhDataSharing}
                            label={<>
                                I authorize you to share my application/registration information with Major League
                                Hacking for event administration, ranking, and administration (including the creation
                                of linked accounts on MLH and DEV (dev.to)) in line with the{' '}
                                <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noreferrer">
                                    MLH Privacy Policy
                                </a>. I further agree to the terms of both the{' '}
                                <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noreferrer">
                                    MLH Contest Terms and Conditions
                                </a>{' '}and the{' '}
                                <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noreferrer">
                                    MLH Privacy Policy
                                </a>.
                            </>}
                        />
                        <CheckboxField
                            id="mlhMarketing"
                            checked={values.mlhMarketing} onChange={toggle('mlhMarketing')}
                            label={<>
                                I authorize MLH + DEV to send me occasional emails about relevant events, career
                                opportunities, and community announcements.
                            </>}
                        />
                    </FormSection>

                    {status === 'error' && (
                        <div className="field-warning register-submit-error">
                            Something went wrong sending that. Check your connection and try again.
                        </div>
                    )}

                    <button className="btn register-submit" type="submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Submitting...' : 'Submit Registration'}
                    </button>
                </form>
            </section>
            <Footer />
        </div>
    );
}
