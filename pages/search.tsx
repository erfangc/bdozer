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
    const router = useRouter();

    async function search(term: string) {
        const {data} = await stockAnalysisApi.findPublishedStockAnalyses(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            term ?? undefined,
            undefined,
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
                <td className="font-mono p-5 text-left">{readablePercent(finalPrice/currentPrice - 1)}</td>
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
                            <th className="p-5 text-left">Over/Under Valued</th>
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