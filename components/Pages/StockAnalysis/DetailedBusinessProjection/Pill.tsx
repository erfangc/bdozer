import React from "react";

export function Pill(props: { label: string, active: boolean, onClick: () => void }) {
    const {active, onClick, label} = props;
    return (
        <button
            className={
                `font-mono numbers-medium focus:outline-none ${active ? 'bg-lime-100 text-navy-100' : 'hover:bg-lime-100 hover:text-navy-100 text-lime-100'} rounded-lg px-2`
            }
            onClick={onClick}
        >
            {label}
        </button>
    )
}