import React, {useEffect, useState} from 'react'
import {StockAnalysisCard} from './StockAnalysisCard';
import {usePublishedStockAnalysis} from "../../../api-hooks";
import {StockAnalysisProjection} from "../../../client";

export function OurUndervaluedPicks() {
    const stockAnalysesApi = usePublishedStockAnalysis();
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysisProjection[]>([])

    async function init() {
        const {data: {stockAnalyses}} = await stockAnalysesApi.top4StockAnalyses();
        setStockAnalyses(stockAnalyses);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <section className="bg-dashboardGray-100 px-8 py-16 flex flex-col justify-center items-center">
            <h3 className="lg:hidden heading4 text-white">Our Undervalued Picks</h3>
            <h3 className="hidden lg:block heading3 text-white">Our Undervalued Picks</h3>
            {/* Card */}
            <div className="flex-col flex space-y-5 lg:space-x-5 lg:space-y-0 lg:flex-row mt-8">
                {stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis}
                                                                       key={stockAnalysis['_id']}/>)}
            </div>
        </section>
    );
}
