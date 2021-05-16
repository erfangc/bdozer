import React from 'react'

export function Arrow({className, ...props}: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="33" height="21" viewBox="0 0 33 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} fill-current`} {...props}>
            <g clipPath="url(#clip0)">
                <path d="M17.645 20.6165L25.8441 14.0605C26.6694 13.3829 25.924 12.3665 24.5663 12.3665H21.8244C20.9459 12.3665 20.1739 11.9938 20.1739 11.4348V1.01642C20.1739 0.457391 19.535 0 18.6299 0L14.3174 0C13.4655 0 12.7202 0.457391 12.7202 1.01642V11.4348C12.7202 11.9938 12.0278 12.3665 11.1495 12.3665H8.40761C7.07658 12.3665 6.3312 13.3829 7.15644 14.0436L15.1426 20.5826C15.7549 21.1247 17.0061 21.1416 17.645 20.6165Z" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="21" height="33" fill="white" transform="translate(33) rotate(90)"/>
                </clipPath>
            </defs>
        </svg>

    )
}
