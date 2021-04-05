import React from 'react'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    active?: boolean
}

export default function Tab({ active, children, className, ...props }: Props) {
    return (
        <button className={`inline pb-2 border-b-4 ${active ? 'border-blue-500 hover:border-white' : 'border-blueGray-900 hover:border-blue-500'} focus:outline-none transition ease-linear ${className}`} {...props}>
            {children}
        </button>
    )
}
