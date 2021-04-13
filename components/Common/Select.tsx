import React from 'react'

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label?: string
    caption?: string
}

export function Select({ label, caption, className, children, ...props }: SelectProps) {
    return (
        <div className="flex-col space-y-2 flex">
            {label ? <label className="text-sm">{label}</label> : null}
            <select
                className={`border appearance-none border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2 ${className}`}
                {...props}
            >
                {children}
            </select>
            {caption ? <p className="text-xs text-blueGray-600">{caption}</p> : null}
        </div>
    )
}