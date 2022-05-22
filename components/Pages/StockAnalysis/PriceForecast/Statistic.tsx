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
        derivedStockAnalytics: {irr, percentUpside},
    } = stockAnalysis;

    const finalPrice = tvps(stockAnalysis);

    return (
        <div className="hidden lg:flex justify-between items-center">
            <div className="flex flex-col text-lime-100">
                <span className="label-small">Forecasted {periods}</span>
                <h1 className="numbers-large">${commafy(finalPrice)}</h1>
            </div>
            <div className="w-px border-l h-16"/>
            <div className="flex flex-col">
                <span className="label-small">Return per Year</span>
                <h1 className="numbers-medium">{readablePercent(irr)}</h1>
            </div>
            <div className="w-px border-l h-16"/>
            <div className="flex flex-col">
                <span className="label-small">Total Return</span>
                <h1 className="numbers-medium">{readablePercent(percentUpside)}</h1>
                <p className="label-micro">*Does not include dividends</p>
            </div>
        </div>
    );
}

function Mobile({stockAnalysis}: Props) {
    const {
        model: {periods},
        derivedStockAnalytics: {irr, percentUpside},
    } = stockAnalysis;
    const finalPrice = tvps(stockAnalysis);
    return (
        <div className="lg:hidden space-y-6">
            <div className="flex justify-between items-center text-lime-100">
                <span className="label-regular">Forecasted {periods}</span>
                <h1 className="numbers-large">${commafy(finalPrice)}</h1>
            </div>
            <div className="flex justify-between">
                <span className="label-regular">Return per Year</span>
                <h1 className="numbers-medium">{readablePercent(irr)}</h1>
            </div>
            <div className="flex justify-between">
                <span className="label-regular">Total Return</span>
                <h1 className="numbers-medium">{readablePercent(percentUpside)}</h1>
            </div>
        </div>
    );
}