import React, {useEffect, useState} from 'react';
import {AuthenticatedPage} from "../components/AuthenticatedPage";
import {Nav} from "../components/Nav";
import {usePublishedStockAnalysis, useWatchLists} from "../api-hooks";
import {StockAnalysis2} from "../client";
import {StockAnalysisCard} from "../components/Pages/WatchLists/StockAnalysisCard";

export default function WatchList() {

    const watchListsApi = useWatchLists();
    const stockAnalysisApi = usePublishedStockAnalysis();

    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis2[]>([]);

    async function init() {
        const {data: watchList} = await watchListsApi.getWatchList()
        const stockAnalysisIds = watchList?.stockAnalysisIds;
        if (!stockAnalysisIds) {

        } else {
            const results = await Promise.all(
                stockAnalysisIds.map(id => stockAnalysisApi.getPublishedStockAnalysis(id))
            );
            setStockAnalyses(results.map(result => result.data))
        }
    }

    useEffect(() => {init()}, [])

    const cards = stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis}/>);

    return (
        <AuthenticatedPage>
            <Nav/>
            <main className="min-h-screen bg-dashboardGray-100 flex p-32 justify-center">
                <div className="flex flex-col space-y-4">
                    <h5 className="heading5 text-lightGreen-25">
                        My WatchList
                    </h5>
                    {cards}
                </div>
            </main>
        </AuthenticatedPage>
    )
}

