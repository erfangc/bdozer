import React from 'react';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export const Button = React.forwardRef(function ({className, children, ...props}: Props, ref) {
    return (
        <button
            {...props}
            className={`label-small text-navy-100 bg-dashboardGray-25 p-1 rounded ${className}`}
            ref={ref as any}
        >
            {children}
        </button>
    );
});