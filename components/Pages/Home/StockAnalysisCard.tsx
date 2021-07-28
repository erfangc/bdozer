import React from 'react'
import {StockAnalysisProjection} from "../../../client";
import {readableMoney, readablePercent} from "../../../number-formatters";

interface Props {
    stockAnalysis: StockAnalysisProjection
}

export function StockAnalysisCard({stockAnalysis}: Props) {
    const {
        currentPrice,
        name,
        targetPrice,
        ticker
    } = stockAnalysis;

    return (
        <div className="bg-navy-100 rounded-lg px-5 py-4 space-y-2 w-72">
            <div className="flex items-center space-x-2">
                <span className="text-lime-100 heading5">{ticker}</span>
                <span className="label-small text-lightGreen-25">{name}</span>
            </div>
            <div>
                <div className="flex space-x-8">
                    <div>
                        <label className="label-micro text-lightGreen-25">Fair Value</label>
                        <p className="numbers-bold text-lightGreen-25">
                            ${targetPrice.toLocaleString('US', {currency: 'USD', maximumSignificantDigits: 4})}
                        </p>
                    </div>
                    <div>
                        <label className="label-micro text-lightGreen-25">Current Price</label>
                        <p className="numbers-bold text-lightGreen-25">
                            ${currentPrice.toLocaleString('US', {currency: 'USD', maximumSignificantDigits: 4})}
                        </p>
                    </div>
                </div>
                <hr className="border-navy-75" />
            </div>
            <p className="text-lime-100">
                {readablePercent(targetPrice/currentPrice - 1)} Upside
            </p>
        </div>
    );
}