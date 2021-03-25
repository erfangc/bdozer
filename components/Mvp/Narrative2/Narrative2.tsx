import React from "react";
import { StockAnalysis } from "../../../client";
import { Comments } from "./Comments";
import { BusinessBreakdown } from "./subcomponents/BusinessBreakdown";
import { EarningsPerShareCalculation } from "./subcomponents/EarningsPerShareCalculation";
import { FutureEarningsPerShare } from "./subcomponents/FutureEarningsPerShare";
import { Overview } from "./subcomponents/Overview";
import { TargetPriceDerivation } from "./subcomponents/TargetPriceDerivation";
import { TargetPriceBreakdown } from "./subcomponents/TargetPriceBreakdown";

interface Props {
    result: StockAnalysis
}

export function Narrative2(props: Props) {
    const { result } = props;

    return (
        <main className="flex-grow min-h-screen px-2 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg flex-col space-y-16">
                <Overview result={result} />
                <TargetPriceBreakdown result={result} />
                <BusinessBreakdown result={result} />
                <EarningsPerShareCalculation result={result} />
                <FutureEarningsPerShare result={result} />
                <TargetPriceDerivation result={result} />
                <Comments result={result} />
            </div>
        </main>
    )
}
