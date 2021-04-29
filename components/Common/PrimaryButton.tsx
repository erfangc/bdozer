import React from 'react'

export function PrimaryButton({ className, children, disabled, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const isString = typeof children === 'string'
    return (
        <button
            className={`text-blueGray-50 rounded py-2 px-4 transition ease-linear focus:outline-none ${disabled ? 'cursor-not-allowed bg-blueGray-500' : 'bg-blue-600 hover:bg-blue-700'} ${isString ? '' : 'flex items-center'} ${className}`}
            {...props}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export function PrimaryButtonAnchor({ className, children, disabled, ...props }: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {disabled?:boolean}) {
    const isString = typeof children === 'string'
    return (
        <a
            className={`cursor-pointer text-blueGray-50 rounded py-2 px-4 transition ease-linear focus:outline-none ${disabled ? 'cursor-not-allowed bg-blueGray-500' : 'bg-blue-600 hover:bg-blue-700'} ${isString ? '' : 'flex items-center'} ${className}`}
            {...props}
        >
            {children}
        </a>
    )
}
