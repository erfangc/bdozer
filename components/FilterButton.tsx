import React, {useCallback, useState} from "react";

export function FilterButton() {

    const [open, setOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setOpen(!open);
    }, [setOpen, open]);

    return (
        <div className="relative">
            <button
                onClick={toggleOpen}
                className={`rounded-t-lg bg-lime-100 text-navy-100 flex space-x-2 items-center py-2 px-6 ${open ? '' : 'rounded-b-lg'}`}
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.3333 24H18.6667V21.3333H13.3333V24ZM4 8V10.6667H28V8H4ZM8 17.3333H24V14.6667H8V17.3333Z"
                        fill="#0B1E33"/>
                </svg>
                Filter
            </button>
            {open && <div className={`absolute right-0 bg-white border-t-lime-100 border-4 p-4`}>
                <h4 className="label-small text-navy-100">Filter for</h4>
                <div className="flex space-x-4 mt-4">
                    <Pill text={'Profit Growing'} onClick={null}/>
                    <Pill text={'Sales Increasing'} onClick={null}/>
                    <Pill text={'Making Money'} onClick={null}/>
                    <Pill text={'Borrows a Lot'} onClick={null} active/>
                    <Pill text={'Below Book Value'} onClick={null}/>
                </div>
            </div>}
        </div>
    )
}

interface PillProps {
    text: string;
    active?: boolean;
    onClick: () => void
}

function Pill({text, active, onClick}: PillProps) {
    return (
        <button
            onClick={onClick}
            className={
                `rounded-2xl border-navy-100 label-small w-36 py-1 ${active ? 'text-navy-100 bg-lime-100' : 'border text-navy-100 hover:bg-lime-100'}`
            }
        >
            {text}
        </button>
    )
}