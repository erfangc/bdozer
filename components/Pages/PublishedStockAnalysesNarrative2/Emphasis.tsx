import React from "react";

export function Emphasis({
                             className,
                             children,
                             ...props
                         }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <b
            className={`text-lg font-bold ${className}`}
            {...props}
        >
            {children}
        </b>
    )
}