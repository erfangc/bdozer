import React, {useCallback, useEffect, useRef, useState} from "react";
import {ZacksDerivedAnalyticsTagsEnum} from "../client";
import {pillLabel} from "./filter-pill-labels";

interface FilterButtonProps {
    selected: ZacksDerivedAnalyticsTagsEnum[];
    onChange: (selected: ZacksDerivedAnalyticsTagsEnum[]) => void;
}

export function FilterButton({selected, onChange}: FilterButtonProps) {

    const [open, setOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setOpen(!open);
    }, [setOpen, open]);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = useCallback((tag: ZacksDerivedAnalyticsTagsEnum) => {
        // if already selected then remove, or else add
        if (selected.includes(tag)) {
            onChange(selected.filter(it => it !== tag));
        } else {
            onChange([...selected, tag]);
        }
    }, [selected, onChange]);

    // register a click outside handler
    useEffect(() => {
        const body = document.body;
        const clickOutsideHandler = ev => {
            if (!ref?.current.contains(ev.target) && open) {
                setOpen(false);
            }
        };
        body.addEventListener('click', clickOutsideHandler);
        return () => body.removeEventListener('click', clickOutsideHandler);
    }, [setOpen, ref, open]);
    
    // register the escape key to close the button
    useEffect(() => {
        const escapeKeyListener = (ev: KeyboardEvent) =>{
            if (ev.key === 'Escape' && open) {
                setOpen(false);
            }
        };
        document.addEventListener('keyup', escapeKeyListener);
        return () => document.removeEventListener('keyup', escapeKeyListener);
    }, [open, setOpen])

    return (
        <div className="relative" ref={ref}>
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
                    <Pill
                        tag={ZacksDerivedAnalyticsTagsEnum.EarningsImproving}
                        onClick={toggle}
                        active={selected.includes(ZacksDerivedAnalyticsTagsEnum.EarningsImproving)}
                    />
                    <Pill
                        tag={ZacksDerivedAnalyticsTagsEnum.RevenueGrowing}    
                        onClick={toggle}
                        active={selected.includes(ZacksDerivedAnalyticsTagsEnum.RevenueGrowing)}
                    />
                    <Pill
                        tag={ZacksDerivedAnalyticsTagsEnum.PositiveEarnings}    
                        onClick={toggle}
                        active={selected.includes(ZacksDerivedAnalyticsTagsEnum.PositiveEarnings)}
                    />
                    <Pill
                        tag={ZacksDerivedAnalyticsTagsEnum.HighlyLevered}    
                        onClick={toggle}
                        active={selected.includes(ZacksDerivedAnalyticsTagsEnum.HighlyLevered)}
                    />
                    <Pill
                        tag={ZacksDerivedAnalyticsTagsEnum.BelowBookValue}    
                        onClick={toggle}
                        active={selected.includes(ZacksDerivedAnalyticsTagsEnum.BelowBookValue)}
                    />
                </div>
            </div>}
        </div>
    )
}

interface PillProps {
    active?: boolean;
    tag: ZacksDerivedAnalyticsTagsEnum;
    onClick: (tag: ZacksDerivedAnalyticsTagsEnum) => void;
}

function Pill({active, tag, onClick}: PillProps) {
    const text = pillLabel(tag);
    return (
        <button
            onClick={() => onClick(tag)}
            className={
                `rounded-2xl border-navy-100 label-small w-36 py-1 ${active ? 'text-navy-100 bg-lime-100' : 'border text-navy-100 hover:bg-lime-100'}`
            }
        >
            {text}
        </button>
    )
}