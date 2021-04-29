import React from "react";

export function Slide({ children, className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div
            className={`w-full slide ${className} min-h-screen flex flex-col px-px`}
            {...props}
        >
            {children}
        </div>
    )
}