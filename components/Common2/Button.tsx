import React from 'react';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export function Button({className, children, ...props}: Props) {
    return <button className={`label-small text-navy-100 bg-dashboardGray-25 p-1 rounded ${className}`}>
        {children}
    </button>;
}