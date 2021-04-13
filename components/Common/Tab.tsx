import React from 'react'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    active?: boolean
    disabled?: boolean
}

export default function Tab({ active, disabled, children, className, ...props }: Props) {
    return (
        <button className={`inline pb-2 border-b-4 ${active ? 'border-blue-500 hover:border-white' : disabled ? 'cursor-not-allowed border-blueGray-900 text-blueGray-400' : 'hover:border-blue-500 border-blueGray-900'} focus:outline-none transition ease-linear ${className}`} {...props}>
            {children}
        </button>
    )
}
