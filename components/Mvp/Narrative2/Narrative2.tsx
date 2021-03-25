import React from "react";
import { StockAnalysis } from "../../../client";
import { SubTitle } from "../../Title";
import { Comments } from "./Comments";
import { FutureEarningsPerShare } from "./subcomponents/FutureEarningsPerShare";
import { Overview } from "./subcomponents/Overview";
import { ProfitWaterFall } from "./subcomponents/ProfitWaterFall";
import { EarningsPerShareCalculation } from "./subcomponents/EarningsPerShareCalculation";
import { TargetPriceDerivation } from "./subcomponents/TargetPriceDerivation";
import { ValueBreakdown } from "./subcomponents/ValueBreakdown";

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
