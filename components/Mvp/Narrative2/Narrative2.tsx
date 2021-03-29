import React from "react";
import { StockAnalysis } from "../../../client";
import { Comments } from "./Comments";
import { BusinessBreakdown } from "./subcomponents/BusinessBreakdown";
import { DiscountFactorDerivation } from "./subcomponents/DiscountFactorDerivation";
import { ExecutiveSummary } from "./subcomponents/ExecutiveSummary";
import { FutureEarningsPerShare } from "./subcomponents/FutureEarningsPerShare";
import { Overview } from "./subcomponents/Overview";
import { RevenueTimeSeries } from "./subcomponents/RevenueTimeSeries";
import { TargetPriceBreakdown } from "./subcomponents/TargetPriceBreakdown";
import { TargetPriceDerivation } from "./subcomponents/TargetPriceDerivation";
import { TerminalValueDerivation } from "./subcomponents/TerminalValueDerivation";
import { Toolbar } from "./Toolbar";

interface Props {
    result: StockAnalysis
}

export function Narrative2(props: Props) {
    const { result } = props;
    return (
        <main className="flex-grow min-h-screen px-3 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg flex-col space-y-20">
                <Toolbar />
                <Overview result={result} />
                <RevenueTimeSeries result={result} />
                <ExecutiveSummary result={result} />
                <BusinessBreakdown result={result} />
                <FutureEarningsPerShare result={result} />
                <TerminalValueDerivation result={result} />
                <TargetPriceDerivation result={result} />
                <TargetPriceBreakdown result={result} />
                <Comments result={result} />
                <div className="mb-20"></div>
            </div>
        </main>
    )
}
