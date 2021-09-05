import Link from 'next/link';
import React, {ReactNode, useState} from 'react';
import {SearchIcon} from "./SearchIcon";

interface Props<T> {
    search: (term: string) => Promise<T[]>
    renderEntity: (entity: T) => ReactNode
    onSelect: (entity: T) => void
    autoFocus?: boolean
}

export function Search<T = any>({search, renderEntity, onSelect, autoFocus}: Props<T>) {

    const [focus, setFocus] = useState(false);
    const [term, setTerm] = useState('')
    const [entities, setEntities] = useState<T[]>([])

    async function onChange({currentTarget: {value}}: React.ChangeEvent<HTMLInputElement>) {
        setTerm(value);
        const entities = await search(value);
        setEntities(entities);
    }

    function focusOff() {
        setFocus(false);
        setTerm('');
        setTimeout(() => setEntities([]), 100);
    }

    function focusOn() {
        setFocus(true);
    }

    const rows = entities.map(entity => {

        function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
            event.preventDefault();
            event.stopPropagation();
            onSelect(entity);
        }

        return (
            <a className="block w-full" onClick={handleClick} href='#'>
                {renderEntity(entity)}
            </a>
        );
    });

    return (
        <div
            className={`h-16 transition ease-linear border-chili-100 rounded flex items-center bg-white w-full ${focus ? 'ring-2 ring-lime-100' : ''} relative`}
        >
            <input
                type="text"
                className="pl-4 h-full border-0 rounded flex-grow focus:outline-none"
                placeholder="Search a stock to analyse for free ..."
                value={term}
                onFocus={focusOn}
                onBlur={focusOff}
                onChange={onChange}
                autoFocus={autoFocus}
            />
            <button className="hidden lg:inline bg-lime-100 h-10 px-6 mr-4 rounded">Search</button>
            <button className="lg:hidden h-12 w-12 mr-4 rounded bg-lime-100 flex items-center justify-center">
                <SearchIcon/>
            </button>
            {/* the results section */}
            <div className="absolute top-full bg-white w-full shadow-md rounded-b-lg">
                {
                    rows.length > 0 ?
                    <div className="p-4 label-small">
                        Can't find a ticker?
                        <span className="ml-1 text-navy-100 underline cursor-pointer">
                            <Link href='/request-analysis'>Request a stock analysis</Link>
                        </span>
                    </div> : null
                }
                <div>{rows}</div>
            </div>
        </div>
    )
}

