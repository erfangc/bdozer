import React from 'react'

export function PageWrapper({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div
            className={`w-full slide ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}