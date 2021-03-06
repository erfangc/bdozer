import React from 'react';
import {StockAnalysis2} from "../../../client";
import {tvps} from "../StockAnalysis/tvps";
import {commafy, readablePercent} from "../../../number-formatters";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Statistic({stockAnalysis}: Props) {
    if (!stockAnalysis) {
        return null;
    }
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
        <div className="hidden lg:flex justify-between items-center">
            <div className="flex flex-col text-lime-100">
                <span className="label-small">Forecasted {periods} Yr Return</span>
                {
                    percentUpside > 0
                    ?
                        <h1 className="numbers-large">{readablePercent(percentUpside)}</h1>
                    :
                        <h1 className="numbers-large text-red-100">{readablePercent(percentUpside)}</h1>
                }
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