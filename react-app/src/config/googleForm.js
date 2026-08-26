/**
 * ============================================================================
 * Google Form wiring for the registration page
 * ============================================================================
 *
 * We submit registrations by POSTing directly to the Google Form's own
 * `formResponse` endpoint (the same endpoint the rendered Form itself
 * submits to) — so respondents never see Google's styling, but the data
 * still lands in the Form's linked Sheet, and Google's own confirmation
 * email fires (response copies are set to "Always").
 *
 * This is wired up to a live Google Form ("TigerHacks 2026 Registration",
 * owned by dereknissen23@gmail.com). Its settings:
 *   - Responses > Collect email addresses: Responder input (REQUIRED)
 *   - Responses > Send responders a copy of their response: Always
 *
 * PIPELINE STATUS (last verified 2026-08-23 by POSTing directly to
 * formResponse and inspecting the real HTTP response — the app's own
 * fetch can't do this, since it runs with mode:'no-cors' and only ever
 * sees an opaque "it went out" response, never a real success/failure):
 *   - The form itself IS live and validating submissions normally (an
 *     unpublished form responds differently), so the earlier "not
 *     published yet" note above was stale.
 *   - FIXED: Track Interest (field 12) is still marked required on the
 *     live Form even though the site UI dropped it — every submission
 *     was being silently rejected by Google (HTTP 400) because nothing
 *     was sent for it. submitRegistration() now always sends "Not sure
 *     yet" for that question to satisfy the requirement.
 *   - STILL BROKEN: the Form also requires a responder email (the
 *     "Collect email addresses" setting above), but this site has no
 *     Email field anywhere in the registration form to source a value
 *     from, and the exact POST parameter Google uses for that system
 *     field couldn't be determined from the outside (a plain
 *     `emailAddress` field did not work). Submissions will keep getting
 *     rejected until either: (a) an "Email Address" field is added to
 *     Register.js and wired to the real entry ID — get that ID by
 *     opening the form's pre-fill link generator in the Forms editor and
 *     filling in the Email question, or by inspecting the real POST body
 *     in dev tools while manually submitting the actual Google-hosted
 *     form once — or (b) Collect Email Addresses is turned off in
 *     Settings > Responses if you don't need it captured there.
 *
 * Field spec the Form was built from (in order):
 *   1.  Full Name                    — Short answer
 *   2.  School                       — Short answer
 *   3.  Year in School                — Multiple choice: Freshman / Sophomore / Junior / Senior / Other
 *   4.  Major                        — Short answer
 *   5.  Discord Username             — Short answer
 *   6.  Teammate 1 Name              — Short answer (not required)
 *   7.  Teammate 1 Email             — Short answer (not required)
 *   8.  Teammate 2 Name              — Short answer (not required)
 *   9.  Teammate 2 Email             — Short answer (not required)
 *   10. Teammate 3 Name              — Short answer (not required)
 *   11. Teammate 3 Email             — Short answer (not required)
 *   12. Track Interest               — Dropdown (no longer collected by this site — see note below)
 *   13. Judging Category             — Multiple choice: Developer / Beginner / Game Dev
 *   14. Shirt Size                   — Dropdown: XS / S / M / L / XL / XXL
 *   15. Dietary Restrictions         — Short answer (not required)
 *   16. How did you hear about us?   — Dropdown: Instagram / Discord / Friend or Classmate / Professor or Class Announcement / Flyer or Poster on Campus / TigerHacks Website / Other
 *   17. If other, please specify     — Short answer (not required)
 *   18. LinkedIn Profile              — Short answer (not required)
 *   19. Country of Residence         — Dropdown (see src/config/countries.js for the full list)
 *   20. MLH Code of Conduct          — Checkboxes, single option with EXACT text:
 *         "I have read and agree to the MLH Code of Conduct."
 *   21. MLH Data Sharing Authorization — Checkboxes, single option with EXACT text:
 *         "I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy."
 *   22. MLH Email Opt-In             — Multiple choice: Yes / No
 *
 * NOTE on checkboxes 20/21: Google Forms "single checkbox agreement"
 * questions submit their exact option text when checked, and are simply
 * omitted from the payload when unchecked — that's what CHECKBOX_VALUES
 * below reflects.
 *
 * NOTE on Track Interest (field 12): the site now only collects Judging
 * Category (Beginner / Developer / Game Dev) — Track Interest duplicated it
 * and was dropped from the registration form. This code no longer submits
 * a value for that question. The live Google Form still has the field; if
 * you want it gone from the Sheet too, delete the question in the Forms
 * editor (Track Interest is otherwise harmless left blank/unrequired).
 */

export const GOOGLE_FORM_ACTION_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLScVcpxEUrxjPQ1t-atCkdkp90VRLC3daK6ughzBU6OWPiMxIA/formResponse';

export const ENTRY_IDS = {
    fullName: 'entry.1813750624',
    school: 'entry.188013309',
    year: 'entry.644478888',
    major: 'entry.1447826589',
    discord: 'entry.2077501624',
    teammate1Name: 'entry.764313557',
    teammate1Email: 'entry.211080741',
    teammate2Name: 'entry.468047144',
    teammate2Email: 'entry.2087239327',
    teammate3Name: 'entry.598072302',
    teammate3Email: 'entry.289560970',
    track: 'entry.1092485980',
    judgingCategory: 'entry.66112312',
    shirtSize: 'entry.942679434',
    dietary: 'entry.190087698',
    heardAbout: 'entry.1863376852',
    heardAboutOther: 'entry.2145810437',
    linkedin: 'entry.1111234069',
    country: 'entry.1428416435',
    codeOfConduct: 'entry.1885424788',
    mlhShare: 'entry.1181409725',
    mlhEmailOptIn: 'entry.1363309505',
};

export const CODE_OF_CONDUCT_TEXT = 'I have read and agree to the MLH Code of Conduct.';

export const MLH_SHARE_TEXT =
    'I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy. I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy.';

/**
 * Submits the registration by POSTing to the Google Form's formResponse
 * endpoint. Uses no-cors, so we can't read a real success/failure response
 * — a resolved promise here means the request went out, not that Google
 * necessarily accepted it. The Form must be published before submissions
 * will actually be accepted — see the file header.
 */
export function submitRegistration(values) {
    const body = new URLSearchParams();

    body.append(ENTRY_IDS.fullName, values.fullName);
    body.append(ENTRY_IDS.school, values.school);
    body.append(ENTRY_IDS.year, values.year);
    body.append(ENTRY_IDS.major, values.major);
    body.append(ENTRY_IDS.discord, values.discord);

    values.teammates.forEach((teammate, i) => {
        const nameKey = ENTRY_IDS[`teammate${i + 1}Name`];
        const emailKey = ENTRY_IDS[`teammate${i + 1}Email`];
        if (nameKey) body.append(nameKey, teammate.name);
        if (emailKey) body.append(emailKey, teammate.email);
    });

    // Track Interest was dropped from the UI, but the live Google Form
    // still marks the question required — omitting it makes Google
    // reject the whole submission (see the pipeline-verified note above).
    body.append(ENTRY_IDS.track, 'Not sure yet');
    body.append(ENTRY_IDS.judgingCategory, values.judgingCategory);
    body.append(ENTRY_IDS.shirtSize, values.shirtSize);
    body.append(ENTRY_IDS.dietary, values.dietary);
    body.append(ENTRY_IDS.heardAbout, values.heardAbout);
    body.append(ENTRY_IDS.heardAboutOther, values.heardAboutOther);
    body.append(ENTRY_IDS.linkedin, values.linkedin);
    body.append(ENTRY_IDS.country, values.country);
    if (values.codeOfConduct) body.append(ENTRY_IDS.codeOfConduct, CODE_OF_CONDUCT_TEXT);
    if (values.mlhShare) body.append(ENTRY_IDS.mlhShare, MLH_SHARE_TEXT);
    body.append(ENTRY_IDS.mlhEmailOptIn, values.mlhEmailOptIn);

    return fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });
}
