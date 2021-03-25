import React from "react";
import NumberFormat from "react-number-format";
import { StockAnalysis } from "../../../client";
import { SubTitle } from "../../Title";
import { Money } from "./Card";
import { Comments } from "./Comments";
import { EarningsPerShareCalculation } from "./EarningsPerShareCalculation";
import { FutureEarningsPerShare } from "./FutureEarningsPerShare";
import { Overview } from "./Overview";
import { ProfitWaterFall } from "./ProfitWaterFall";
import { TargetPriceDerivation } from "./TargetPriceDerivation";
import { ValueBreakdown } from "./ValueBreakdown";

interface Props {
    result: StockAnalysis
}

export function Narrative2(props: Props) {
    const { result } = props;

    return (
        <main className="text-blueGray-50 flex-grow min-h-screen px-2 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg flex-col space-y-16">
                <div>
                    <Overview result={result} />
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
                <div>
                    <Comments result={result} />
                </div>
            </div>
        </main>
    )
}
