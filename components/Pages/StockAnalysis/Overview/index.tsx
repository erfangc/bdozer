import {Button} from "../../../Common/Button";
import React from "react";
import {StockAnalysis2} from "../../../../client";
import {commafy} from "../../../../number-formatters";
import {ShareAnalysisButton} from "./ShareAnalysisButton";
import {tvps} from "../tvps";
import {WatchingButton} from "./WatchingButton/WatchingButton";
import {Statistic} from "./Statistic";
import {ReturnForecastChart} from "./ReturnForecastChart";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Overview({stockAnalysis}: Props) {

    const {
        ticker,
        name,
        model: {
            periods,
        },
        lastUpdated,
    } = stockAnalysis;

    const {
        derivedStockAnalytics: {
            currentPrice,
        },
    } = stockAnalysis;
    const finalPrice = tvps(stockAnalysis);

    return (
        <section className="bg-navy-100 p-6 space-y-10 rounded-lg w-mobileCard lg:w-card" id="overview">
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center flex-col lg:flex-row">
                        <h1 className="heading1 self-start text-lime-100">{ticker}</h1>
                        <span className="lg:border-l lg:pl-4 lg:ml-4">{name}</span>
                    </div>
                    <div className="space-x-2 pt-4 hidden lg:flex">
                        {/* TODO make these work */}
                        <Button>Change Assumption</Button>
                        {/* TODO make these work */}
                        <Button>Download Model</Button>
                        <ShareAnalysisButton/>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <WatchingButton stockAnalysis={stockAnalysis}/>
                    <div className="text-xs leading-4 text-lightGreen-25 hidden lg:block">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </div>
                </div>
            </div>
            <p>
                Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and
                internationally.
                The company operates through three segments: North America, International, and Amazon Web Services
                (AWS).
            </p>
            <h3 className="heading3">Return Forecast</h3>
            <Statistic stockAnalysis={stockAnalysis}/>
            <p className="paragraph-regular">
                In {periods} years, you could earn an Forecasted <span className="text-lime-100">${commafy(finalPrice - currentPrice)}</span> on a
                single stock purchased at <span className="text-lime-100">${commafy(currentPrice)}</span> / share today.
            </p>
            <ReturnForecastChart stockAnalysis={stockAnalysis}/>

        </section>
    )
}
