import { useEffect, useMemo, useRef, useState } from 'react';
import './Form.css';

const MAX_SUGGESTIONS = 8;

export function FormSection({ icon, title, description, children }) {
    return (
        <div className="form-section paper-card">
            <h3 className="form-section-title">
                {icon} {title}
            </h3>
            {description && <p className="form-section-desc">{description}</p>}
            {children}
        </div>
    );
}

export function TextField({ label, required, hint, error, warning, ...inputProps }) {
    return (
        <div className={`field ${error ? 'field-invalid' : ''}`}>
            <label className="field-label" htmlFor={inputProps.id}>
                {label}
                {required && <span className="field-required">*</span>}
            </label>
            {hint && <span className="field-hint">{hint}</span>}
            <input className="ac-input" {...inputProps} />
            {error && <span className="field-error">{error}</span>}
            {warning && <div className="field-warning">{warning}</div>}
        </div>
    );
}

export function TextAreaField({ label, required, hint, error, ...inputProps }) {
    return (
        <div className={`field ${error ? 'field-invalid' : ''}`}>
            <label className="field-label" htmlFor={inputProps.id}>
                {label}
                {required && <span className="field-required">*</span>}
            </label>
            {hint && <span className="field-hint">{hint}</span>}
            <textarea className="ac-textarea" {...inputProps} />
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}

export function SelectField({ label, required, hint, error, options, placeholder, ...selectProps }) {
    return (
        <div className={`field ${error ? 'field-invalid' : ''}`}>
            <label className="field-label" htmlFor={selectProps.id}>
                {label}
                {required && <span className="field-required">*</span>}
            </label>
            {hint && <span className="field-hint">{hint}</span>}
            <select className="ac-select" {...selectProps}>
                <option value="" disabled hidden>
                    {placeholder || 'Select one...'}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}

// A searchable dropdown for choosing one exact string out of a large fixed
// list (e.g. MLH's ~13k-school list), where a plain <select> would be too
// long to scan and free text would let the same entity be typed many
// different ways. Only committing options the caller passed in keeps the
// stored value canonical.
export function AutocompleteField({ label, required, hint, error, options, value, onChange, id, placeholder }) {
    const [query, setQuery] = useState(value || '');
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const rootRef = useRef(null);

    useEffect(() => {
        setQuery(value || '');
    }, [value]);

    useEffect(() => {
        const onClickOutside = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
                setQuery(value || '');
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, [value]);

    const matches = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const starts = [];
        const contains = [];
        for (const opt of options) {
            const lower = opt.toLowerCase();
            if (lower.startsWith(q)) starts.push(opt);
            else if (lower.includes(q)) contains.push(opt);
            if (starts.length >= MAX_SUGGESTIONS) break;
        }
        return [...starts, ...contains].slice(0, MAX_SUGGESTIONS);
    }, [query, options]);

    const commit = (opt) => {
        onChange(opt);
        setQuery(opt);
        setOpen(false);
    };

    const handleBlur = () => {
        const exact = options.find((o) => o.toLowerCase() === query.trim().toLowerCase());
        if (exact) {
            if (exact !== value) onChange(exact);
            setQuery(exact);
        } else {
            setQuery(value || '');
        }
        setOpen(false);
    };

    const handleKeyDown = (e) => {
        if (!open || matches.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlighted((h) => Math.min(h + 1, matches.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlighted((h) => Math.max(h - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            commit(matches[highlighted]);
        } else if (e.key === 'Escape') {
            setOpen(false);
            setQuery(value || '');
        }
    };

    return (
        <div className={`field ac-combobox ${error ? 'field-invalid' : ''}`} ref={rootRef}>
            <label className="field-label" htmlFor={id}>
                {label}
                {required && <span className="field-required">*</span>}
            </label>
            {hint && <span className="field-hint">{hint}</span>}
            <input
                id={id}
                className="ac-input"
                autoComplete="off"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    setHighlighted(0);
                }}
                onFocus={() => setOpen(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            {open && matches.length > 0 && (
                <ul className="ac-combobox-panel">
                    {matches.map((opt, i) => (
                        <li key={opt}>
                            <button
                                type="button"
                                className={`ac-combobox-option ${i === highlighted ? 'ac-combobox-option-highlighted' : ''}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => commit(opt)}
                            >
                                {opt}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {open && query.trim() && matches.length === 0 && (
                <div className="ac-combobox-empty">
                    Can't find it? Request it be added at{' '}
                    <a href="https://my.mlh.io" target="_blank" rel="noreferrer" onMouseDown={(e) => e.preventDefault()}>
                        my.mlh.io
                    </a>.
                </div>
            )}
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}

export function FileField({ label, required, hint, error, accept, fileName, id, onChange }) {
    return (
        <div className={`field ${error ? 'field-invalid' : ''}`}>
            <label className="field-label" htmlFor={id}>
                {label}
                {required && <span className="field-required">*</span>}
            </label>
            {hint && <span className="field-hint">{hint}</span>}
            <label className="ac-file">
                <input
                    id={id}
                    type="file"
                    accept={accept}
                    className="ac-file-input"
                    onChange={onChange}
                />
                <span className="ac-file-btn">Choose file</span>
                <span className="ac-file-name">{fileName || 'No file selected'}</span>
            </label>
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}

export function CheckboxField({ id, label, required, error, checked, onChange }) {
    return (
        <div className={`field field-checkbox ${error ? 'field-invalid' : ''}`}>
            <label className="checkbox-row" htmlFor={id}>
                <input
                    id={id}
                    type="checkbox"
                    className="ac-checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <span className="checkbox-label">
                    {label}
                    {required && <span className="field-required">*</span>}
                </span>
            </label>
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}

export function ChipGroup({ label, required, hint, error, name, options, value, onChange }) {
    return (
        <div className={`field ${error ? 'field-invalid' : ''}`}>
            <label className="field-label">
                {label}
                {required && <span className="field-required">*</span>}
            </label>
            {hint && <span className="field-hint">{hint}</span>}
            <div className="chip-group">
                {options.map((opt) => {
                    const id = `${name}-${opt}`;
                    return (
                        <div className="chip-option" key={opt}>
                            <input
                                type="radio"
                                id={id}
                                name={name}
                                value={opt}
                                checked={value === opt}
                                onChange={() => onChange(opt)}
                            />
                            <label htmlFor={id}>{opt}</label>
                        </div>
                    );
                })}
            </div>
            {error && <span className="field-error">{error}</span>}
        </div>
    );
}
