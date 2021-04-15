import React from 'react'

interface Props extends React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement> {

}

export function BlockQuote({children, className, ...props}: Props) {
    return (
        <blockquote
            className={`my-4 pl-6 border-l-4 bg-blueGray-800 py-2 text-sm text-blueGray-300 ${className}`}
            {...props}
        >
            {children}
        </blockquote>
    )
}