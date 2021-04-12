import React from 'react'

export function PrimaryButton({ className, children, disabled, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={`text-blueGray-50 rounded py-2 px-4 transition ease-linear focus:outline-none flex items-center ${disabled ? 'cursor-not-allowed bg-blueGray-500' : 'bg-blue-600 hover:bg-blue-700'} ${className}`}
            {...props}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
