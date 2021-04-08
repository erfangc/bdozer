import React from 'react'


interface ToolButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string
    loading?: boolean
}

export function ToolButton({ label, loading, children, className, ...props }: ToolButtonProps) {
    return (
        <div className="flex flex-col space-y-1 justify-center items-center">
            <button className={`bg-blueGray-600 rounded-md shadow-lg px-4 py-2 focus:outline-none hover:shadow-none transition ease-linear ${className}`} disabled={loading} {...props}>
                {children}
            </button>
            <span className="text-sm text-blueGray-200">{label}</span>
        </div>
    )
}
