import {usePublishedStockAnalysis} from "../../api-hooks";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import {StockAnalysisProjection} from "../../client";
import {SearchIcon} from "./SearchIcon";

export function NavSearch() {

    const stockAnalysisApi = usePublishedStockAnalysis();
    const router = useRouter();
    const [active, setActive] = useState(false);
    const [term, setTerm] = useState('');
    const ref = useRef<HTMLInputElement>();
    const [results, setResults] = useState<StockAnalysisProjection[]>([]);

    async function search(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        if (value) {
            setTerm(value);
            const {data: stockAnalysisResponse} = await stockAnalysisApi.findPublishedStockAnalyses(
                undefined,
                undefined,
                undefined,
                undefined,
                6,
                value,
                undefined,
            )
            setResults(stockAnalysisResponse.stockAnalyses);
        } else {
            setTerm('');
            setResults([]);
        }
    }

    function navigateToAnalysis(analysis: StockAnalysisProjection) {
        const id = analysis['_id'];
        router.push(`/stock-analyses/${id}`)
    }

    function handleClick() {
        setActive(!active);
        ref.current.select();
        if (active) {
            setResults([]);
        }
    }

    function collapse() {
        setTimeout(
            () => {
                setActive(!active);
                setResults([]);
            }, 300
        )
    }

    return (
        <div className="flex space-x-1 relative">
            <input
                onClick={()=>ref.current.select()}
                ref={ref}
                placeholder="Search for a stock"
                onBlur={collapse}
                onChange={search}
                value={term}
                className={`transition duration-200 ${active ? 'w-48 py-2 px-3' : 'w-0 px-0 py-0'} focus:outline-none text-chili-100 rounded bg-lime-25`}
                type="text"
            />
            <SearchIcon onClick={handleClick}/>
            <ul className="absolute top-14 bg-lime-25 cursor-pointer text-chili-100 w-full rounded">
                {results.map(result => {
                    return (
                        <li
                            key={result['_id']}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                navigateToAnalysis(result);
                            }}
                            className="px-3 py-2 hover:bg-lime-100"
                        >
                            {result.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}