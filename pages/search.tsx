import React, {useEffect, useState} from 'react';
import {Page} from "../components/Page";
import {Nav} from "../components/Nav";
import {StockSearch} from "../components/Pages/Search/StockSearch";
import {usePublishedStockAnalysis} from "../api-hooks";
import {StockAnalysisProjection} from "../client";
import {commafy, readablePercent} from "../number-formatters";
import {useRouter} from "next/router";
import {AscIcon, DescIcon, UnsortedIcon} from "../components/Pages/Search/Icons";
import {upsideP} from "../components/Pages/StockAnalysis/upside";

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
            15,
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

        const upside = upsideP(stockAnalysis);
        return (
            <tr
                className="cursor-pointer transition ease-in hover:bg-lightGreen-50 hover:text-chili-100"
                onClick={navigate}
            >
                <td className="font-mono p-5 text-left">{name}</td>
                <td className="font-mono p-5 text-left">{ticker}</td>
                <td className={`font-mono p-5 text-left ${upside > 0 ? 'text-lime-100' : 'text-red-100'}`}>{readablePercent(upside)}</td>
                <td className="font-mono p-5 text-left hidden lg:table-cell">${commafy(currentPrice)}</td>
                <td className="font-mono p-5 text-left hidden lg:table-cell">${commafy(finalPrice)}</td>
                <td className="font-mono p-5 text-left hidden lg:table-cell">
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
                    <div className="px-2 lg:px-0 ">
                        <h2 className="heading2">Stock Overview</h2>
                        <br/>
                        <StockSearch onChange={search}/>
                        <br/>
                    </div>
                    <table className="label-small lg:label-regular w-full">
                        <thead>
                        <tr className="pb-2 border-b">
                            <th className="p-5 text-left">Company</th>
                            <th className="p-5 text-left">Symbol</th>
                            <th className="p-5 text-left cursor-pointer flex" onClick={toggleSort}>
                                Over/Under Valued
                                {sort == undefined ? <UnsortedIcon/> : sort === 'descending' ? <DescIcon/> : <AscIcon/>}
                            </th>
                            <th className="p-5 text-left hidden lg:table-cell">Current Share Price</th>
                            <th className="p-5 text-left hidden lg:table-cell">Forecasted Price</th>
                            <th className="p-5 text-left hidden lg:table-cell"/>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </main>
        </Page>
    );
}
