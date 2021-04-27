import Link from 'next/link'
import React from 'react'

export function Toolbar() {

    return (
        <div className="shadow bg-blueGray-800 px-2 py-2 flex space-x-6 fixed bottom-0 lg:top-0 lg:bottom-auto left-0 lg:left-20 right-0 justify-center z-10 overflow-x-scroll lg:overflow-x-auto">
            <ToolButton href={'/browse'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7ZM3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" fill="#CBD5E1" />
                </svg>
                Browse More
            </ToolButton>
            <ToolButton href='/early-access'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="#CBD5E1" />
                </svg>
                Change Assumptions
            </ToolButton>
        </div>
    )

}

function ToolButton({ href, className, children, ...props }: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    return (
        <Link href={href}>
            <a
                className={`text-blueGray-50 px-4 py-2 text-sm font-light shadow-md rounded focus:outline-none flex flex-col hover:bg-blueGray-600 justify-center items-center ${className} transition ease-linear bg-blueGray-900`}
                {...props}
            >
                {children}
            </a>
        </Link>
    )
}