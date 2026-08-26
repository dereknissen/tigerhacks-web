import { useState } from 'react';
import './Register.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { FormSection, TextField, TextAreaField, SelectField, ChipGroup, AgreeCheckbox } from '../../components/Form/Fields';
import { PawPrint, Bell, Leaf, Acorn, Heart } from '../../components/Icons/Icons';
import { COUNTRIES } from '../../config/countries';
import { submitRegistration } from '../../config/googleForm';

const YEAR_OPTIONS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Other'];
const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const HEARD_ABOUT_OPTIONS = [
    'Instagram', 'Discord', 'Friend or Classmate', 'Professor or Class Announcement',
    'Flyer or Poster on Campus', 'TigerHacks Website', 'Other',
];
const MAX_TEAMMATES = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyValues = {
    fullName: '', school: '', year: '', major: '', discord: '',
    teammates: [],
    judgingCategory: '', shirtSize: '', dietary: '',
    heardAbout: '', heardAboutOther: '', linkedin: '', country: '',
    codeOfConduct: false, mlhShare: false, mlhEmailOptIn: '',
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

    const updateTeammate = (i, key, val) => {
        setValues((v) => ({
            ...v,
            teammates: v.teammates.map((t, idx) => (idx === i ? { ...t, [key]: val } : t)),
        }));
    };

    const validate = () => {
        const e = {};
        if (!values.fullName.trim()) e.fullName = 'Please enter your name.';
        if (!values.school.trim()) e.school = 'Please enter your school.';
        if (!values.year) e.year = 'Please select your year.';
        if (!values.major.trim()) e.major = 'Please enter your major.';
        if (!values.discord.trim()) e.discord = 'Please enter your Discord username.';
        if (!values.judgingCategory) e.judgingCategory = 'Please pick a judging category.';
        if (!values.shirtSize) e.shirtSize = 'Please select a shirt size.';
        if (!values.heardAbout) e.heardAbout = 'Please let us know how you heard about us.';
        if (!values.country) e.country = 'Please select your country of residence.';
        if (!values.mlhEmailOptIn) e.mlhEmailOptIn = 'Please choose an option.';
        if (!values.codeOfConduct) e.codeOfConduct = 'You must agree to the MLH Code of Conduct to register.';
        if (!values.mlhShare) e.mlhShare = 'You must authorize this to register.';

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
            document.querySelector('.field-invalid, .agree-field.field-invalid')?.scrollIntoView({
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
                        <a className="btn" href="https://discord.com" target="_blank" rel="noreferrer">
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
                        <TextField
                            id="fullName" label="Full Name" required
                            value={values.fullName} onChange={set('fullName')} error={errors.fullName}
                        />
                        <TextField
                            id="school" label="School" required
                            value={values.school} onChange={set('school')} error={errors.school}
                        />
                        <ChipGroup
                            label="Year in School" required name="year" options={YEAR_OPTIONS}
                            value={values.year} onChange={(v) => setValues((s) => ({ ...s, year: v }))}
                            error={errors.year}
                        />
                        {values.year === 'Other' && (
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
                            hint="New to hacking? Pick Beginner: it's judged separately so first-timers can shine."
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

                    <FormSection icon={<Acorn style={{ width: '20pt' }} />} title="Logistics">
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
                    </FormSection>

                    <FormSection icon={<Heart style={{ width: '20pt' }} />} title="Consent">
                        <AgreeCheckbox
                            id="codeOfConduct" checked={values.codeOfConduct}
                            onChange={(v) => setValues((s) => ({ ...s, codeOfConduct: v }))}
                            error={errors.codeOfConduct}
                        >
                            I have read and agree to the{' '}
                            <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noreferrer">MLH Code of Conduct</a>.
                        </AgreeCheckbox>

                        <AgreeCheckbox
                            id="mlhShare" checked={values.mlhShare}
                            onChange={(v) => setValues((s) => ({ ...s, mlhShare: v }))}
                            error={errors.mlhShare}
                        >
                            I authorize you to share my application/registration information with Major League
                            Hacking for event administration, ranking, and MLH administration in-line with the{' '}
                            <a href="https://mlh.io/privacy" target="_blank" rel="noreferrer">MLH Privacy Policy</a>.
                            I further agree to the terms of both the{' '}
                            <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noreferrer">
                                MLH Contest Terms and Conditions
                            </a>{' '}
                            and the <a href="https://mlh.io/privacy" target="_blank" rel="noreferrer">MLH Privacy Policy</a>.
                        </AgreeCheckbox>

                        <ChipGroup
                            label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
                            required name="mlhEmailOptIn" options={['Yes', 'No']}
                            value={values.mlhEmailOptIn}
                            onChange={(v) => setValues((s) => ({ ...s, mlhEmailOptIn: v }))}
                            error={errors.mlhEmailOptIn}
                        />

                        <p className="discord-reminder">
                            🎮 Haven't joined our Discord yet? It's how we'll communicate with you throughout the
                            event: <a href="https://discord.com" target="_blank" rel="noreferrer">join here</a>.
                        </p>
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
