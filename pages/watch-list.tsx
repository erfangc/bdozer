import React, {useEffect, useState} from 'react';
import {AuthenticatedPage} from "../components/AuthenticatedPage";
import {useWatchLists} from "../api-hooks";
import {StockAnalysis2} from "../client";
import {StockAnalysisCard, StockAnalysisCardSkeleton} from "../components/Pages/WatchLists/StockAnalysisCard";
import {Nav} from "../components/Nav";

export default function WatchList() {

    const watchListsApi = useWatchLists();
    const [loading, setLoading] = useState(true);
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis2[]>([]);

    async function init() {
        setLoading(true);
        const {data: watchList} = await watchListsApi.getWatchedStockAnalyses();
        const stockAnalyses = watchList?.stockAnalyses;
        setStockAnalyses(stockAnalyses);
        setLoading(false);
    }

    useEffect(() => {
        init()
    }, [])

    const cards = loading
        ? <StockAnalysisCardSkeleton/>
        : stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis} watching/>);

    return (
        <AuthenticatedPage>
            <Nav/>
            <main className="min-h-screen bg-dashboardGray-100 flex p-32 justify-center">
                <div className="flex flex-col space-y-4">
                    <h5 className="heading5 text-lightGreen-25">My WatchList</h5>
                    {cards}
                </div>
            </main>
        </AuthenticatedPage>
    )
}

