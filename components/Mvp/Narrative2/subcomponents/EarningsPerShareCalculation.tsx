import React from "react";
import { StockAnalysis } from "../../../../client";
import { simpleNumber } from "../../../../simple-number";
import { SubTitle } from "../../../Title";

interface Props {
    result: StockAnalysis
}

export function EarningsPerShareCalculation({ result }: Props) {
    const profit = result.businessWaterfall[0].profit
    const sharesOutstanding = result.shareOutstanding.historicalValue?.value
    const profitPerShare = result.profitPerShare.historicalValue?.value
    const profitSpan = <span className={`font-bold ${profit.value > 0 ? 'text-green-600' : 'text-red-500'}`}>{simpleNumber(profit.value)}</span>;
    return (
        <div>
            <SubTitle className="mb-6">Earning Per Share</SubTitle>
            <p>
                Latest year profit was {profitSpan}, as
                a shareholder you are entitled to:
            </p>
            <div className="flex flex-col text-blueGray-300 mt-10">
                <div className="flex justify-between">
                    <b>Profit</b>
                    <span className="font-light">{simpleNumber(profit.value)}</span>
                </div>
                <div className="flex justify-between">
                    <b>Shares Outstanding</b>
                    <span className="font-light"> <span className="font-semibold text-lg">÷</span> {simpleNumber(sharesOutstanding)}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <b className="pt-2">Earning Per Share</b>
                    <span className="font-light border-t pt-2">{profitPerShare}</span>
                </div>
            </div>
        </div>
    )
}