import React from 'react';
import {PublishedStockAnalysisControllerApi, StockAnalysis2} from "../../client";
import {basePath} from "../../api-hooks";
import {Overview} from "../../components/Pages/StockAnalysis/Overview";
import {DetailedBusinessProjection} from "../../components/Pages/StockAnalysis/DetailedBusinessProjection";
import {FutureGrowthPerShare} from "../../components/Pages/StockAnalysis/FutureGrowthPerShare";
import {PriceForecast} from "../../components/Pages/StockAnalysis/PriceForecast";
import {TableOfContent} from "../../components/Pages/StockAnalysis/TableOfContent";
import {Page} from "../../components/Page";
import {Nav} from "../../components/Nav";
import {BusinessSummary} from "../../components/Pages/StockAnalysis/BusinessSummary";

interface Props {
    stockAnalysis: StockAnalysis2
}

export default function StockAnalysis({stockAnalysis}: Props) {
    return (
        <Page>
            <Nav/>
            <main className="bg-dashboardGray-100 min-h-screen text-gray-2">
                <div className="flex justify-center py-12 lg:py-32 lg:space-x-8">
                    <TableOfContent stockAnalysis={stockAnalysis}/>
                    <div className="space-y-6">
                        <Overview stockAnalysis={stockAnalysis}/>
                        <BusinessSummary stockAnalysis={stockAnalysis}/>
                        <DetailedBusinessProjection stockAnalysis={stockAnalysis}/>
                        <FutureGrowthPerShare stockAnalysis={stockAnalysis}/>
                        <PriceForecast stockAnalysis={stockAnalysis}/>
                    </div>
                </div>
            </main>
        </Page>
    );
}

StockAnalysis.getInitialProps = async (ctx) => {
    const stockAnalyzer = new PublishedStockAnalysisControllerApi(null, basePath);
    const {data} = await stockAnalyzer.getPublishedStockAnalysis(ctx.query.id)
    return {stockAnalysis: data}
}
