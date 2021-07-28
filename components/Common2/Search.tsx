import React, {ReactNode, useState} from 'react';
import {StockAnalysisProjection} from "../../client";
import {usePublishedStockAnalysis} from "../../api-hooks";

interface Props<T> {
    search: (term: string) => Promise<T[]>
    renderEntity: (entity:T) => ReactNode
}

export function Search<T = any>({search, renderEntity}: Props<T>) {

    const [focus, setFocus] = useState(false);
    const [term, setTerm] = useState('')
    const [entities, setEntities] = useState<T[]>([])

    async function onChange({currentTarget: {value}}: React.ChangeEvent<HTMLInputElement>) {
        setTerm(value);
        const entities = await search(value);
        setEntities(entities);
    }

    function focusOn() {
        setFocus(true);
    }

    function focusOff() {
        setFocus(false);
        setEntities([]);
        setTerm('');
    }

    const rows = entities.map(entity => renderEntity(entity));

    return (
        <div className={`h-16 transition ease-linear border-chili-100 rounded flex items-center bg-white w-full ${focus ? 'ring-2 ring-lime-100' : ''} relative`}>
            <input
                type="text"
                className="pl-4 h-full border-0 rounded flex-grow focus:outline-none"
                placeholder="Search a stock to analyse for free ..."
                value={term}
                onFocus={focusOn}
                onBlur={focusOff}
                onChange={onChange}
            />
            <button className="bg-lime-100 h-10 px-6 mr-4 rounded">Search</button>
            {/* the results section */}
            <div className="absolute top-full bg-white w-full shadow-md rounded-b-lg">
                <ul>{rows}</ul>
            </div>
        </div>
    )
}

export function StockSearch() {
    const stockAnalysisApi = usePublishedStockAnalysis();

    function renderRow(stockAnalysis: StockAnalysisProjection) {
        return (
            <li className="py-4 px-10 items-center cursor-pointer flex justify-between hover:bg-lime-50">
                <span className="label-medium">{stockAnalysis.name}</span>
                <span className="px-2 py-1 bg-chili-100 rounded text-lightGreen-25">{stockAnalysis.ticker}</span>
            </li>
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

    return (
        <Search search={search} renderEntity={renderRow}/>
    );
}