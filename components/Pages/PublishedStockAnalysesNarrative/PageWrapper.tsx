import React from 'react'

export function PageWrapper({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div
            className={`w-full slide ${className} min-h-screen flex flex-col px-4`}
            {...props}
        >
            {children}
        </div>
    )
}