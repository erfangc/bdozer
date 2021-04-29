import React from 'react';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export function Carousel({children, className, ...props}: Props) {
    return (
        <div className={`slides relative ${className}`} {...props}>
            {children}
        </div>
    )
}