/**
 * Submits the registration to the submitRegistration Cloud Function, which
 * uploads the resume to Firebase Storage and appends a row directly to the
 * registration Google Sheet via the Sheets API. Same-origin (proxied through
 * Firebase Hosting at /api/submitRegistration), so unlike the old
 * raw-POST-to-Google-Forms approach, this gets a real success/failure
 * response instead of an opaque no-cors result.
 *
 * The resume File is sent as base64 inside the JSON body to keep the payload
 * a single request with no multipart parsing on the function side.
 */
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = String(reader.result || '');
            const comma = result.indexOf(',');
            resolve(comma >= 0 ? result.slice(comma + 1) : result);
        };
        reader.onerror = () => reject(reader.error || new Error('Could not read the resume file'));
        reader.readAsDataURL(file);
    });
}

export async function submitRegistration(values) {
    const { resume, ...rest } = values;
    const payload = { ...rest };

    if (resume) {
        payload.resume = {
            name: resume.name,
            type: resume.type || '',
            data: await readFileAsBase64(resume),
        };
    }

    const res = await fetch('/api/submitRegistration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Registration submission failed (${res.status})`);
    }
}
