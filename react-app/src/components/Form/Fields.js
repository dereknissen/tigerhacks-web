import './Form.css';

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
