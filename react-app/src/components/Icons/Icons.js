/* Small hand-coded decorative SVGs used to round out the Animal Crossing
   styling where we don't have a source image asset (clouds, leaves, an
   acorn, a bell, a fence, paw print). Kept intentionally simple/flat so
   they sit well next to the illustrated theme art. */

export function Cloud({ style, className }) {
    return (
        <svg className={className} style={style} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="38" rx="26" ry="18" fill="white" />
            <ellipse cx="60" cy="26" rx="30" ry="24" fill="white" />
            <ellipse cx="90" cy="38" rx="24" ry="16" fill="white" />
            <rect x="20" y="38" width="80" height="16" rx="8" fill="white" />
        </svg>
    );
}

export function Leaf({ style, className, color = "#FAC3B4" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 56C8 24 32 8 56 8C56 40 32 56 8 56Z" fill={color} stroke="#F2977E" strokeWidth="3" strokeLinejoin="round" />
            <path d="M12 52C24 40 34 28 52 12" stroke="#F2977E" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

export function Acorn({ style, className }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 26C18 14 24 8 32 8C40 8 46 14 46 26" stroke="#7A4B26" strokeWidth="4" fill="#B9793F" />
            <ellipse cx="32" cy="40" rx="18" ry="18" fill="#E0AD70" stroke="#7A4B26" strokeWidth="3" />
            <path d="M22 26h20" stroke="#7A4B26" strokeWidth="3" />
            <circle cx="32" cy="6" r="3" fill="#FAC3B4" />
        </svg>
    );
}

export function Bell({ style, className }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6c11 0 18 9 18 22v10l6 10H8l6-10V28C14 15 21 6 32 6Z" fill="#FAC3B4" stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="32" cy="52" r="6" fill="#F2977E" stroke="#423C38" strokeWidth="3" />
            <path d="M26 6a6 6 0 0 1 12 0" stroke="#423C38" strokeWidth="3" />
        </svg>
    );
}

export function Heart({ style, className, color = "#FAC3B4" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M32 56C18 46 6 36.5 6 24C6 14.6 13.2 8 21.5 8C26.2 8 30 10.4 32 14C34 10.4 37.8 8 42.5 8C50.8 8 58 14.6 58 24C58 36.5 46 46 32 56Z"
                fill={color}
                stroke="#D68A72"
                strokeWidth="3"
                strokeLinejoin="round"
            />
            <path d="M16 20C17 16 20 13.5 24 13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

/* Repeating EKG/heart-rate trace — the path starts and ends on the same
   baseline (y=25) so two copies placed side by side tile seamlessly for
   the scrolling countdown backdrop. */
export function Pulse({ style, className, color = "#F2977E" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 25H30L38 8L48 44L58 12L66 25H100"
                stroke={color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function PawPrint({ style, className, color = "#423C38" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill={color} xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="42" rx="16" ry="13" />
            <ellipse cx="12" cy="24" rx="7" ry="9" />
            <ellipse cx="28" cy="14" rx="7" ry="9" />
            <ellipse cx="46" cy="14" rx="7" ry="9" transform="rotate(10 46 14)" />
            <ellipse cx="56" cy="30" rx="7" ry="9" transform="rotate(25 56 30)" />
        </svg>
    );
}

export function Sparkle({ style, className, color = "#FAC3B4" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 40 40" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2C21 12 22 18 38 20C22 22 21 28 20 38C19 28 18 22 2 20C18 18 19 12 20 2Z" />
        </svg>
    );
}

export function Sun({ style, className, color = "#FAC3B4" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="14" fill={color} stroke="#423C38" strokeWidth="3" />
            <g stroke="#423C38" strokeWidth="4" strokeLinecap="round">
                <path d="M32 4v8" />
                <path d="M32 52v8" />
                <path d="M4 32h8" />
                <path d="M52 32h8" />
                <path d="M12.7 12.7l5.6 5.6" />
                <path d="M45.7 45.7l5.6 5.6" />
                <path d="M12.7 51.3l5.6-5.6" />
                <path d="M45.7 18.3l5.6-5.6" />
            </g>
        </svg>
    );
}

export function Clock({ style, className, color = "#FAC3B4" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4h20" stroke="#423C38" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 4v6" stroke="#423C38" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="36" r="24" fill={color} stroke="#423C38" strokeWidth="3" />
            <path d="M32 22v14l10 8" stroke="#423C38" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function People({ style, className, color = "#D1D1FF" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="44" cy="24" r="8" fill="#FEFEFE" stroke="#423C38" strokeWidth="3" />
            <path d="M28 55c1-11 7-17 16-17s15 6 16 17" fill="#FEFEFE" stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="24" cy="20" r="10" fill={color} stroke="#423C38" strokeWidth="3" />
            <path d="M4 56c0-13 8-21 20-21s20 8 20 21" fill={color} stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
        </svg>
    );
}

export function Trophy({ style, className, color = "#E2574C" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 12H6c-1 0-2 1-2 2 0 8 5 13 12 14" stroke="#423C38" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M50 12h8c1 0 2 1 2 2 0 8-5 13-12 14" stroke="#423C38" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M18 10h28v14c0 10-6 18-14 18s-14-8-14-18V10Z" fill={color} stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
            <path d="M32 42v8" stroke="#423C38" strokeWidth="4" strokeLinecap="round" />
            <path d="M21 58h22l-3-8H24l-3 8Z" fill={color} stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
        </svg>
    );
}

export function SpeakerOn({ style, className, color = "#423C38" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 24h9l15-11v38l-15-11H6V24Z" fill={color} stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
            <path d="M38 22c4 5 4 15 0 20" stroke="#423C38" strokeWidth="4" strokeLinecap="round" />
            <path d="M46 15c8 9 8 25 0 34" stroke="#423C38" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
}

export function SpeakerOff({ style, className, color = "#423C38" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 24h9l15-11v38l-15-11H6V24Z" fill={color} stroke="#423C38" strokeWidth="3" strokeLinejoin="round" />
            <path d="M40 22l16 16M56 22L40 38" stroke="#423C38" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
}

export function Compass({ style, className, color = "#ADADEF" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="26" fill={color} stroke="#423C38" strokeWidth="3" />
            <path d="M40 24L28 30L24 42L36 36L40 24Z" fill="#FEFEFE" stroke="#423C38" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="32" cy="32" r="2.5" fill="#423C38" />
        </svg>
    );
}

export function Moon({ style, className, color = "#D1D1FF" }) {
    return (
        <svg className={className} style={style} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M46 8C34 8 24 18 24 32C24 46 34 56 46 56C36 60 24 58 16 50C6 40 6 24 16 14C24 6 36 4 46 8Z"
                fill={color}
                stroke="#423C38"
                strokeWidth="3"
                strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="2.5" fill="#423C38" />
            <circle cx="14" cy="34" r="1.8" fill="#423C38" />
        </svg>
    );
}
