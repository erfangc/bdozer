import React from 'react'


interface ToolButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string
    loading?: boolean
}

export function ToolButton({ label, loading, children, className, ...props }: ToolButtonProps) {
    return (
        <div className="flex flex-col space-y-1 justify-center items-center">
            <button className={`${loading ? 'text-blueGray-500 cursor-not-allowed' : 'text-blueGray-200'} bg-blueGray-600 rounded shadow-lg px-4 py-2 focus:outline-none hover:shadow-none transition ease-linear ${className}`} disabled={loading} {...props}>
                {children}
            </button>
            <span className="text-sm text-blueGray-400">{label}</span>
        </div>
    )
}
