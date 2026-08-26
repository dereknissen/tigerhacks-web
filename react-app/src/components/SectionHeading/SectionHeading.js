export default function SectionHeading({ tag, icon, title, subtitle }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {tag && (
                <span className="section-tag">
                    {icon}
                    {tag}
                </span>
            )}
            <h2 className="section-heading">{title}</h2>
            {subtitle && <p className="section-sub">{subtitle}</p>}
        </div>
    );
}
