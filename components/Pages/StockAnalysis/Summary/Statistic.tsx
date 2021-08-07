import React from 'react';
import {StockAnalysis2} from "../../../../client";
import {tvps} from "../tvps";
import {upside} from "../upside";
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
        derivedStockAnalytics: {currentPrice}
    } = stockAnalysis;

    const finalPrice = tvps(stockAnalysis);
    const upside1 = upside(stockAnalysis);

    return (
        <div className="hidden lg:flex justify-between items-center">
            <div className="flex flex-col text-lime-100">
                <span className="label-small">Upside</span>
                <h1 className="numbers-large">{readablePercent(upside1)}</h1>
            </div>
            <div className="w-px border-l h-16"/>
            <div className="flex flex-col">
                <span className="label-small">Target Price</span>
                <h1 className="numbers-medium">${commafy(finalPrice)}</h1>
            </div>
            <div className="w-px border-l h-16"/>
            <div className="flex flex-col">
                <span className="label-small">Current Price</span>
                <h1 className="numbers-medium">${commafy(currentPrice)}</h1>
            </div>
        </div>
    );
}

function Mobile({stockAnalysis}: Props) {
    const {
        derivedStockAnalytics: {currentPrice}
    } = stockAnalysis;
    const finalPrice = tvps(stockAnalysis);
    const upside1 = upside(stockAnalysis);
    return (
        <div className="lg:hidden space-y-6">
            <div className="flex justify-between items-center text-lime-100">
                <span className="label-regular">Upside</span>
                <h1 className="numbers-large">{readablePercent(upside1)}</h1>
            </div>
            <div className="flex justify-between">
                <span className="label-regular">Target Price</span>
                <h1 className="numbers-medium">${commafy(finalPrice)}</h1>
            </div>
            <div className="flex justify-between">
                <span className="label-regular">Current Price</span>
                <h1 className="numbers-medium">${commafy(currentPrice)}</h1>
            </div>
        </div>
    );
}