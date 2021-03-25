import { useRouter } from 'next/router'
import React from 'react'

export function Toolbar() {
    const router = useRouter()
    function requestEarlyAccess() {
        router.push('/early-access')
    }
    return (
        <div className="shadow-md bg-blueGray-800 px-2 py-2 flex space-x-10 fixed bottom-0 lg:top-0 lg:bottom-auto left-0 lg:left-20 right-0 justify-center z-10">
            <ToolButton onClick={requestEarlyAccess}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="#CBD5E1" />
                </svg>
            Assumptions
        </ToolButton>
            <ToolButton onClick={requestEarlyAccess}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C10.82 20 9.66 19.74 8.57 19.22C8.3 19.09 8.01 19.03 7.71 19.03C7.52 19.03 7.33 19.06 7.15 19.11L3.95 20.05L4.89 16.85C5.03 16.38 4.99 15.87 4.78 15.43C4.26 14.34 4 13.18 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.98 2.97 16.29L1 23L7.71 21.03C9.02 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#CBD5E1" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 8H11V11H8V13H11V16H13V13H16V11H13V8Z" fill="#CBD5E1" />
                </svg>
            Request Stock
        </ToolButton>
            <ToolButton onClick={requestEarlyAccess}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="#CBD5E1" />
                </svg>
            Size Trade
        </ToolButton>
        </div>
    )
}

function ToolButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={`text-blueGray-50 px-2 py-2 text-sm font-light rounded-md focus:outline-none flex flex-col hover:bg-blueGray-600 justify-center items-center ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}