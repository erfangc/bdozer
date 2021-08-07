import React, {ReactNode, useState} from 'react';
import {StockAnalysisProjection} from "../../client";
import {usePublishedStockAnalysis} from "../../api-hooks";
import {useRouter} from "next/router";

interface Props<T> {
    search: (term: string) => Promise<T[]>
    renderEntity: (entity: T) => ReactNode
    onSelect: (entity: T) => void
}

export function Search<T = any>({search, renderEntity, onSelect}: Props<T>) {

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
            <a className="block w-full" onClick={handleClick}>
                {renderEntity(entity)}
            </a>
        );
    });

    return (
        <div
            className={`h-16 transition ease-linear border-chili-100 rounded flex items-center bg-white w-full ${focus ? 'ring-2 ring-lime-100' : ''} relative`}>
            <input
                type="text"
                className="pl-4 h-full border-0 rounded flex-grow focus:outline-none"
                placeholder="Search a stock to analyse for free ..."
                value={term}
                onFocus={focusOn}
                onBlur={focusOff}
                onChange={onChange}
            />
            <button className="hidden lg:inline bg-lime-100 h-10 px-6 mr-4 rounded">Search</button>
            <button className="lg:hidden h-12 w-12 mr-4 rounded bg-lime-100 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.6667 18.6667H19.6067L19.24 18.3C20.5467 16.7867 21.3333 14.82 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.82 21.3333 16.7867 20.5467 18.3 19.2467L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.35333 18.6667 6.66667 15.98 6.66667 12.6667C6.66667 9.35333 9.35333 6.66667 12.6667 6.66667C15.98 6.66667 18.6667 9.35333 18.6667 12.6667C18.6667 15.98 15.98 18.6667 12.6667 18.6667Z"
                        fill="#253209"
                    />
                </svg>
            </button>
            {/* the results section */}
            <div className="absolute top-full bg-white w-full shadow-md rounded-b-lg">
                <div>{rows}</div>
            </div>
        </div>
    )
}

export function StockSearch() {

    const stockAnalysisApi = usePublishedStockAnalysis();
    const router = useRouter();

    function renderRow(stockAnalysis: StockAnalysisProjection) {
        return (
            <span className="py-4 px-10 items-center cursor-pointer flex justify-between hover:bg-lime-50">
                <span className="label-medium">{stockAnalysis.name}</span>
                <span className="px-2 py-1 bg-chili-100 rounded text-lightGreen-25">
                    {stockAnalysis.ticker}
                </span>
            </span>
        );
    }

    async function search(term: string): Promise<StockAnalysisProjection[]> {
        if (term) {
            const {data: stockAnalysisResponse} = await stockAnalysisApi.findPublishedStockAnalyses(
                undefined,
                undefined,
                undefined,
                undefined,
                6,
                term,
                undefined,
            )
            return stockAnalysisResponse.stockAnalyses
        } else {
            return [];
        }
    }

    function navigateToAnalysis(analysis: StockAnalysisProjection) {
        const id = analysis['_id'];
        router.push(`/stock-analyses/${id}`)
    }

    return (
        <Search search={search} renderEntity={renderRow} onSelect={navigateToAnalysis}/>
    );
}