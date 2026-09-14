const { onRequest } = require('firebase-functions/v2/https');
const { google } = require('googleapis');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp();

const SPREADSHEET_ID = '1fiRoEDP-qgW0xuKK9Ij9tyou4ZFpmUvWzBgYcg9e9y8';
const SHEET_RANGE = 'A:X';

const REQUIRED_FIELDS = [
    'fullName', 'email', 'school', 'year', 'major', 'discord',
    'judgingCategory', 'shirtSize', 'heardAbout', 'country',
];

const RESUME_MAX_BYTES = 10 * 1024 * 1024;
const RESUME_EXT_RE = /\.(pdf|doc|docx)$/i;
const RESUME_CONTENT_TYPES = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

async function uploadResume(resume, fullName) {
    const match = String(resume.name || '').match(RESUME_EXT_RE);
    if (!match) {
        throw new HttpError(400, 'Resume must be a PDF, DOC, or DOCX file');
    }
    const ext = match[1].toLowerCase();

    const buffer = Buffer.from(resume.data, 'base64');
    if (buffer.length === 0) {
        throw new HttpError(400, 'The resume file was empty');
    }
    if (buffer.length > RESUME_MAX_BYTES) {
        throw new HttpError(400, 'Resume exceeds the 10 MB limit');
    }

    const safeName = String(fullName || '')
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase() || 'applicant';
    const objectPath = `resumes/${Date.now()}-${safeName}.${ext}`;
    const token = crypto.randomUUID();

    const bucket = admin.storage().bucket();
    await bucket.file(objectPath).save(buffer, {
        resumable: false,
        contentType: RESUME_CONTENT_TYPES[ext] || resume.type || 'application/octet-stream',
        metadata: {
            metadata: { firebaseStorageDownloadTokens: token },
        },
    });

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
}

async function appendRegistrationRow(values, resumeUrl) {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const teammates = Array.isArray(values.teammates) ? values.teammates : [];
    const teammate = (i) => teammates[i] || {};

    const row = [
        new Date().toISOString(),
        values.fullName,
        values.email,
        values.school,
        values.year,
        values.major,
        values.discord,
        teammate(0).name || '',
        teammate(0).email || '',
        teammate(1).name || '',
        teammate(1).email || '',
        teammate(2).name || '',
        teammate(2).email || '',
        values.judgingCategory,
        values.shirtSize,
        values.dietary || '',
        values.heardAbout,
        values.heardAboutOther || '',
        values.linkedin || '',
        values.country,
        resumeUrl,
        values.mlhCodeOfConduct ? 'Yes' : 'No',
        values.mlhDataSharing ? 'Yes' : 'No',
        values.mlhMarketing ? 'Yes' : 'No',
    ];

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_RANGE,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [row] },
    });
}

exports.submitRegistration = onRequest(
    { cors: ['https://tigerhacks.dev', 'http://localhost:3000'], memory: '512MiB' },
    async (req, res) => {
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
            return;
        }

        const values = req.body || {};
        const missing = REQUIRED_FIELDS.filter((key) => !String(values[key] || '').trim());
        if (missing.length > 0) {
            res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
            return;
        }

        const resume = values.resume;
        if (!resume || !resume.data || !resume.name) {
            res.status(400).json({ error: 'Missing required field: resume' });
            return;
        }

        if (!values.mlhCodeOfConduct || !values.mlhDataSharing) {
            res.status(400).json({ error: 'The required MLH agreements must be accepted' });
            return;
        }

        try {
            const resumeUrl = await uploadResume(resume, values.fullName);
            await appendRegistrationRow(values, resumeUrl);
            res.status(200).json({ success: true });
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.status).json({ error: err.message });
                return;
            }
            console.error('Failed to record registration', err);
            res.status(502).json({ error: 'Failed to record registration' });
        }
    },
);
