import React from "react";
import NumberFormat from "react-number-format";
import { StockAnalysis } from "../../../client";
import { simpleNumber } from "../../../simple-number";
import { SubTitle } from "../../Title";
import { Money, Percent, Number } from "./Card";
import { EarningsPerShareCalculation } from "./EarningsPerShareCalculation";
import { FutureEarningsPerShare } from "./FutureEarningsPerShare";
import { TargetPriceDerivation } from "./TargetPriceDerivation";
import { ProfitWaterFall } from "./ProfitWaterFall";
import { ValueBreakdown } from "./ValueBreakdown";

interface Props {
    result: StockAnalysis
}

export function Narrative2(props: Props) {
    const {
        result,
        result: {
            cells,
            model: {
                description,
                symbol,
                beta,
                equityRiskPremium,
                riskFreeRate,
            },
            currentPrice,
            targetPrice,
            discountRate,
        }
    } = props;

    const upside = (targetPrice / currentPrice - 1) * 100;
    return (
        <main className="text-blueGray-50 flex-grow min-h-screen px-2 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg flex-col space-y-16">
                <div>
                    <span className="font-extralight">Company</span><SubTitle>{symbol}</SubTitle>
                    <div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between shadow-lg px-4 py-2 bg-blueGray-700 rounded-md">
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg">Target Price</span>
                                <NumberFormat className="font-light" value={targetPrice} displayType="text" prefix="$" decimalScale={2} />
                            </div>
                            <div className="flex flex-col justify-center mr-2">
                                <span className={`text-xs ${upside > 0 ? 'text-lime-400' : 'bg-rose-500'} font-bold`}>
                                    {upside.toFixed(1)}% <span className="font-normal">Upside</span>
                                </span>
                            </div>
                        </div>
                        <Money title="Current Price" value={currentPrice} />
                    </div>
                </div>
                <div>
                    <SubTitle className="mb-6">Value Breakdown</SubTitle>
                    <ValueBreakdown result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Business Breakdown</SubTitle>
                    <ProfitWaterFall result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Earning Per Share</SubTitle>
                    <EarningsPerShareCalculation result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Future Earnings per Share</SubTitle>
                    <FutureEarningsPerShare result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Target Price Derivation</SubTitle>
                    <TargetPriceDerivation result={result} />
                </div>
            </div>
        </main>
    )
}
