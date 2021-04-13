import { useRouter } from 'next/router'
import React from 'react'

export function Toolbar() {

    const router = useRouter()

    function requestEarlyAccess() {
        router.push('/early-access')
    }

    function requestStock() {
        router.push('/request-stock')
    }

    function browse() {
        router.push('/browse')
    }

    return (
        <div className="shadow-md bg-blueGray-800 px-2 py-2 flex space-x-6 fixed bottom-0 lg:top-0 lg:bottom-auto left-0 lg:left-20 right-0 justify-center z-10 overflow-x-scroll lg:overflow-x-auto">
            <ToolButton onClick={browse}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7ZM3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" fill="#CBD5E1" />
                </svg>
                Browse More
            </ToolButton>
            <ToolButton onClick={requestEarlyAccess}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="#CBD5E1" />
                </svg>
                Change Assumptions
            </ToolButton>
            <ToolButton onClick={requestStock}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C10.82 20 9.66 19.74 8.57 19.22C8.3 19.09 8.01 19.03 7.71 19.03C7.52 19.03 7.33 19.06 7.15 19.11L3.95 20.05L4.89 16.85C5.03 16.38 4.99 15.87 4.78 15.43C4.26 14.34 4 13.18 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.98 2.97 16.29L1 23L7.71 21.03C9.02 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#CBD5E1" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 8H11V11H8V13H11V16H13V13H16V11H13V8Z" fill="#CBD5E1" />
                </svg>
                Request Stock
            </ToolButton>
        </div>
    )

}

function ToolButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={`text-blueGray-50 px-4 py-2 text-sm font-light shadow-md rounded focus:outline-none flex flex-col hover:bg-blueGray-600 justify-center items-center ${className} transition ease-linear bg-blueGray-900`}
            {...props}
        >
            {children}
        </button>
    )
}