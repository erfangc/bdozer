import {usePublishedStockAnalysis} from "../api-hooks";
import {useRouter} from "next/router";
import {StockAnalysisProjection} from "../client";
import React from "react";
import {Search} from "./Common/Search";

interface StockSearchProps {
    autoFocus?: boolean
}

export function StockSearch({autoFocus}: StockSearchProps) {

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
        <Search search={search} renderEntity={renderRow} onSelect={navigateToAnalysis} autoFocus={autoFocus}/>
    );
}