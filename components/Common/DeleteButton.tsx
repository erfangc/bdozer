import React from "react";

export function DeleteButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`border border-red-500 text-red-500 rounded px-4 py-2 hover:bg-red-500 hover:text-blueGray-50 transition ease-linear focus:outline-none ${className}`} {...props}>
            {children}
        </button>
    )
}
