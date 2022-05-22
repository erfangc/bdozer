import React from 'react';
import {StockAnalysis2} from "../../../../client";
import {tvps} from "../tvps";
import {commafy, readablePercent} from "../../../../number-formatters";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Statistic({stockAnalysis}: Props) {
    return (
        <>
            <Desktop stockAnalysis={stockAnalysis}/>
            <Mobile stockAnalysis={stockAnalysis}/>
        </>
    );
}

function Desktop({stockAnalysis}: Props) {
    const {
        model: {periods},
        derivedStockAnalytics: {currentPrice, percentUpside}
    } = stockAnalysis;

    const finalPrice = tvps(stockAnalysis);

    return (
        // we give this wrapper DIV element an Id so that TableOfContent can retrieve its offSetHeight to
        // render a side panel - not sure if there is a better way to do it
        <div className="hidden lg:flex justify-between items-center" id="top-level-stats">
            <div className="flex flex-col text-lime-100">
                <span className="label-small">Forecasted {periods} Yr Return</span>
                <h1 className="numbers-large">{readablePercent(percentUpside)}</h1>
            </div>
            <div className="w-px border-l h-16"/>
            <div className="flex flex-col">
                <span className="label-small">Current Price</span>
                <h1 className="numbers-medium">${commafy(currentPrice)}</h1>
            </div>
            <div className="w-px border-l h-16"/>
            <div className="flex flex-col">
                <span className="label-small">Forecasted {periods} Yr Price</span>
                <h1 className="numbers-medium">${commafy(finalPrice)}</h1>
            </div>
        </div>
    );
}

function Mobile({stockAnalysis}: Props) {
    const {
        model: {periods},
        derivedStockAnalytics: {currentPrice, percentUpside}
    } = stockAnalysis;
    const finalPrice = tvps(stockAnalysis);
    return (
        <div className="lg:hidden space-y-6">
            <div className="flex justify-between items-center text-lime-100">
                <span className="label-regular">Forecasted {periods} Yr Return</span>
                <h1 className="numbers-large">{readablePercent(percentUpside)}</h1>
            </div>
            <div className="flex justify-between">
                <span className="label-regular">Current Price</span>
                <h1 className="numbers-medium">${commafy(currentPrice)}</h1>
            </div>
            <div className="flex justify-between">
                <span className="label-regular">Forecasted {periods} Yr Price</span>
                <h1 className="numbers-medium">${commafy(finalPrice)}</h1>
            </div>
        </div>
    );
}