import React, { useState } from 'react';

export function SecondaryButton({ children, width, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { width?: number }) {

    const [hovering, setHovering] = useState(false);

    function hoverTrue() {
        setHovering(true);
    }

    function hoverFalse() {
        setHovering(false);
    }

    return (
        <button className={`relative h-12`} style={{ width: `${width}rem` }} {...props} onMouseEnter={hoverTrue} onMouseLeave={hoverFalse}>
            <span className={`absolute text-white flex items-center inset-0 bg-lime-100 rounded-full shadow-md h-12 ${hovering ? 'w-full' : 'w-12'} transition-all ease-linear`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-12 h-12"><path d="M0 0h24v24H0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
            </span>
            <span className={`absolute inset-0 pl-14 flex items-center paragraph-medium`}>
                {children}
            </span>
        </button>
    )
}
