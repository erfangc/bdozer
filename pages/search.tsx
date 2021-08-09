import React, {useEffect, useState} from 'react';
import {Page} from "../components/Page";
import {Nav} from "../components/Nav";
import {StockSearch} from "../components/Pages/Search/StockSearch";
import {usePublishedStockAnalysis} from "../api-hooks";
import {StockAnalysisProjection} from "../client";
import {commafy, readablePercent} from "../number-formatters";
import {useRouter} from "next/router";

export default function Search() {

    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysisProjection[]>([]);
    const stockAnalysisApi = usePublishedStockAnalysis();
    const [term, setTerm] = useState('')
    const [sort, setSort] = useState<'ascending' | 'descending' | undefined>(undefined)
    const router = useRouter();

    function search(term: string) {
        setTerm(term);
        refresh(term, sort)
    }

    function toggleSort() {
        if (sort == undefined) {
            setSort('descending');
            refresh(term, 'descending')
        } else if (sort == 'descending') {
            setSort('ascending');
            refresh(term, 'ascending')
        } else {
            setSort(undefined);
            refresh(term, undefined);
        }
    }

    async function refresh(term: string, sort: 'ascending' | 'descending' | undefined) {
        const {data} = await stockAnalysisApi.findPublishedStockAnalyses(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            term ?? undefined,
            undefined,
            sort,
        );
        setStockAnalyses(data.stockAnalyses);
    }

    useEffect(() => {
        search(undefined);
    }, []);

    const rows = stockAnalyses.map(stockAnalysis => {
        const {
            currentPrice,
            finalPrice,
            name,
            ticker
        } = stockAnalysis;

        function navigate() {
            router.push(`/stock-analyses/${stockAnalysis['_id']}`);
        }

        return (
            <tr
                className="cursor-pointer transition ease-in hover:bg-lightGreen-50 hover:text-chili-100"
                onClick={navigate}
            >
                <td className="font-mono p-5 text-left">{name}</td>
                <td className="font-mono p-5 text-left">{ticker}</td>
                <td className="font-mono p-5 text-left">{readablePercent(finalPrice / currentPrice - 1)}</td>
                <td className="font-mono p-5 text-left">${commafy(currentPrice)}</td>
                <td className="font-mono p-5 text-left">${commafy(finalPrice)}</td>
                <td className="font-mono p-5 text-left">
                    <button>Watching</button>
                </td>
            </tr>
        );
    });

    return (
        <Page>
            <Nav/>
            <main className="bg-dashboardGray-100 min-h-screen">
                <div className="mx-auto py-24 container text-lightGreen-25">
                    <h2 className="heading2">Stock Overview</h2>
                    <br/>
                    <StockSearch onChange={search}/>
                    <br/>
                    <table className="w-full">
                        <thead>
                        <tr className="pb-2 border-b">
                            <th className="p-5 text-left">Company</th>
                            <th className="p-5 text-left">Symbol</th>
                            <th className="p-5 text-left cursor-pointer flex" onClick={toggleSort}>
                                Over/Under Valued
                                {sort == undefined ? <UnsortedIcon/> : sort === 'descending' ? <DescIcon/> : <AscIcon/>}
                            </th>
                            <th className="p-5 text-left">Current Share Price</th>
                            <th className="p-5 text-left">Forecasted Price</th>
                            <th className="p-5 text-left"/>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </main>
        </Page>
    );
}

function DescIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" className="fill-current">
            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/>
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
        </svg>
    )
}

function AscIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" className="fill-current">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/>
        </svg>
    )
}

function UnsortedIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" className="fill-current">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path
                d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/>
        </svg>
    )
}