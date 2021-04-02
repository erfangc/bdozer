import React from 'react'

export function PageWrapper({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div
            className={`w-full slide ${className} min-h-screen flex flex-col px-4 md:px-0 md:container md:max-w-2xl md:mx-auto`}
            {...props}
        >
            {children}
        </div>
    )
}