import React from 'react'

export function Arrow({className, ...props}: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className={`fill-current ${className}`}
            width="65"
            height="64"
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M35.1845 62.8311L51.0859 42.8512C52.6863 40.786 51.2408 37.6884 48.6077 37.6884H43.2901C41.5863 37.6884 40.0891 36.5525 40.0891 34.8488V3.09767C40.0891 1.39395 38.8501 0 37.0947 0L28.731 0C27.0789 0 25.6333 1.39395 25.6333 3.09767L25.6333 34.8488C25.6333 36.5525 24.2905 37.6884 22.5873 37.6884H17.2696C14.6882 37.6884 13.2426 40.786 14.8431 42.7995L30.3315 62.7279C31.5189 64.38 33.9454 64.4316 35.1845 62.8311Z"/>
        </svg>
    )
}
