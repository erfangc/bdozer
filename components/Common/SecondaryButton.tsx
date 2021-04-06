import React from 'react'

export function SecondaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`text-blueGray-100 bg-blueGray-800 rounded px-3 py-2 transition ease-linear hover:bg-blueGray-700 focus:outline-none ${className}`} {...props}>
            {children}
        </button>
    )
}