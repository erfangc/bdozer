import React from 'react'

export function PageTitle({ className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
    return (
        <h1
            className={`font-extrabold text-3xl text-blueGray-300 max-w-md ${className}`}
            {...props}
        >
            {children}
        </h1>
    )
}