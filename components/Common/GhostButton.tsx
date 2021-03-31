import React from 'react'

export function GhostButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`h-8 border-blue-500 text-blue-500 text-base border px-4 rounded transition ease-linear hover:bg-blue-500 hover:text-blueGray-50 focus:outline-none ${className}`} {...props}>
            {children}
        </button>
    )
}

export function SmallGhostButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`border-blue-400 text-blue-400 text-sm border px-2 rounded-sm transition ease-linear hover:bg-blue-500 hover:text-blueGray-50 focus:outline-none ${className}`} {...props}>
            {children}
        </button>
    )
}
