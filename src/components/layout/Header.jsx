export function Header() {
    return (
        <header className="site-header">
            <div className="container header-inner">
                <div className="brand">
                    <div className="brand-logo" aria-hidden="true">
                        <svg viewBox="0 0 40 40" fill="none">
                            <rect
                                x="1"
                                y="1"
                                width="38"
                                height="38"
                                rx="10"
                                stroke="currentColor"
                                strokeOpacity=".28"
                                strokeWidth="1.5"
                            />
                            <circle cx="12" cy="20" r="3.4" fill="currentColor" />
                            <circle cx="28" cy="12" r="3.4" fill="currentColor" fillOpacity=".7" />
                            <circle cx="28" cy="28" r="3.4" fill="currentColor" fillOpacity=".7" />
                            <path
                                d="M15 18.5 25 13.5M15 21.5l10 5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <h1 className="brand-name">StateLab</h1>
                </div>
                <span className="react-badge">
                    <span className="react-dot" />
                    React
                </span>
            </div>
        </header>
    )
}
