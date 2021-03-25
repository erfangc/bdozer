import React from "react";
import { StockAnalysis } from "../../../client";
import { Comments } from "./Comments";
import { BusinessBreakdown } from "./subcomponents/BusinessBreakdown";
import { ExecutiveSummary } from "./subcomponents/ExecutiveSummary";
import { FutureEarningsPerShare } from "./subcomponents/FutureEarningsPerShare";
import { Overview } from "./subcomponents/Overview";
import { TargetPriceBreakdown } from "./subcomponents/TargetPriceBreakdown";
import { TargetPriceDerivation } from "./subcomponents/TargetPriceDerivation";
import { TerminalValueDerivation } from "./subcomponents/TerminalValueDerivation";

interface Props {
    result: StockAnalysis
}

export function Narrative2(props: Props) {
    const { result } = props;
    return (
        <main className="flex-grow min-h-screen px-3 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg flex-col space-y-20">
                <Overview result={result} />
                <ExecutiveSummary result={result} />
                <BusinessBreakdown result={result} />
                <FutureEarningsPerShare result={result} />
                <TerminalValueDerivation result={result} />
                <TargetPriceDerivation result={result} />
                <TargetPriceBreakdown result={result} />
                <Comments result={result} />
            </div>
        </main>
    )
}
