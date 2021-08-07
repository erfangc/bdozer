import React from 'react';
import {UnsecuredApp} from "../../components/App";
import {PublishedStockAnalysisControllerApi, StockAnalysis2} from "../../client";
import {basePath} from "../../api-hooks";
import {Logo} from "../../components/Pages/Home/Logo";
import {PrimaryButton} from "../../components/Common2/PrimaryButton";
import {Summary} from "../../components/Pages/StockAnalysis/Summary";
import {ReturnForecast} from "../../components/Pages/StockAnalysis/ReturnForecast";
import {BusinessBreakdown} from "../../components/Pages/StockAnalysis/BusinessBreakdown";
import {FutureGrowthPerShare} from "../../components/Pages/StockAnalysis/FutureGrowthPerShare";
import {PriceForecast} from "../../components/Pages/StockAnalysis/PriceForecast";
import {TableOfContent} from "../../components/Pages/StockAnalysis/TableOfContent";

interface Props {
    stockAnalysis: StockAnalysis2
}

export default function StockAnalysis({stockAnalysis}: Props) {
    return (
        <UnsecuredApp>
            <nav className="bg-chili-100 h-12 text-white items-center flex justify-between antialiased">
                <Logo/>
                <div className="space-x-4 pr-12 hidden">
                    <PrimaryButton>Register Today</PrimaryButton>
                    <button className="text-lime-100">Log In</button>
                </div>
            </nav>

            <main className="bg-dashboardGray-100 min-h-screen text-gray-2">
                <div className="flex justify-center py-32 space-x-8">
                    <TableOfContent stockAnalysis={stockAnalysis}/>
                    <div className="space-y-6">
                        <Summary stockAnalysis={stockAnalysis}/>
                        <ReturnForecast stockAnalysis={stockAnalysis}/>
                        <BusinessBreakdown stockAnalysis={stockAnalysis}/>
                        <FutureGrowthPerShare stockAnalysis={stockAnalysis}/>
                        <PriceForecast stockAnalysis={stockAnalysis}/>
                    </div>
                </div>
            </main>
        </UnsecuredApp>
    );
}

StockAnalysis.getInitialProps = async (ctx) => {
    const stockAnalyzer = new PublishedStockAnalysisControllerApi(null, basePath);
    const {data} = await stockAnalyzer.getPublishedStockAnalysis(ctx.query.id)
    return {stockAnalysis: data}
}
