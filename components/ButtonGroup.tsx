import React from 'react'

interface Props {

}

export function ButtonGroup() {
    return (
        <div></div>
    )
}

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    active?: boolean
}

export function ButtonGroupMember({active, children, className,...props}: ButtonProps) {
    return (
        <button
            {...props}
        >
            {children}
        </button>
    )
}