export function Billboard() {
    return (
        <section className="flex-grow flex self-start justify-center">
            <div className="hidden lg:flex-col lg:flex items-center">
                <Inbox />
                <p className="text-2xl">
                    Click on items to add/edit drivers
                    </p>
            </div>
        </section>
    )
}

function Inbox() {
    return (
        <svg width="257" height="256" viewBox="0 0 257 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
                <path d="M256.35 156.35L226.35 21.35C225.6 17.8995 222.45 15.5 219 15.5H38C34.5505 15.5 31.4 17.8995 30.65 21.35L0.65 156.35C0.5 156.95 0.5 157.4 0.5 158L83.5 203H173.5L256.5 158C256.5 157.4 256.5 156.95 256.35 156.35Z" fill="url(#paint0_linear)" />
                <path d="M197.8 158C192.04 158 186.775 161.263 184.214 166.423L175.568 183.835C174.301 186.386 171.698 188 168.85 188H88.1495C85.301 188 82.6985 186.386 81.432 183.835L72.786 166.423C70.2245 161.263 64.961 158 59.2 158H0.5V233C0.5 237.142 3.858 240.5 8 240.5H249C253.142 240.5 256.5 237.142 256.5 233V158H197.8Z" fill="url(#paint1_linear)" />
            </g>
            <defs>
                <linearGradient id="paint0_linear" x1="128.5" y1="203" x2="128.5" y2="15.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00B59C" />
                    <stop offset="1" stop-color="#9CFFAC" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="128.5" y1="240.5" x2="128.5" y2="158" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#C3FFE8" />
                    <stop offset="0.9973" stop-color="#F0FFF4" />
                </linearGradient>
                <clipPath id="clip0">
                    <rect width="256" height="256" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>
    )
}
