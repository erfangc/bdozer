import React from 'react';

export function PrimaryButton({
                                  className,
                                  children,
                                  ...props
                              }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`bg-lime-100 rounded-3xl paragraph-medium text-chili-100 shadow-md px-6 py-2 hover:bg-avocado-75 hover:text-lightGreen-25 ${className}`}>
            {children}
        </button>
    )
}
