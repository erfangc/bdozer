import React from "react";
import { StockAnalysis } from "../../../client";
import { Comments } from "./Comments";
import { BusinessBreakdown } from "./subcomponents/BusinessBreakdown";
import { ExecutiveSummary } from "./subcomponents/ExecutiveSummary";
import { FutureEarningsPerShare } from "./subcomponents/FutureEarningsPerShare";
import { Overview } from "./subcomponents/Overview";
import { Feedback } from "./subcomponents/Feedback";
import { TargetPriceBreakdown } from "./subcomponents/TargetPriceBreakdown";
import { TargetPriceDerivation } from "./subcomponents/TargetPriceDerivation";
import { TerminalValueDerivation } from "./subcomponents/TerminalValueDerivation";
import { Toolbar } from "./Toolbar";
import { LegalDisclaimer } from "../../LegalDisclaimer";

interface Props {
    result: StockAnalysis
}

export function Narrative2(props: Props) {
    const { result } = props;
    return (
        <main className="flex-col space-y-20 pb-20 min-h-screen px-3 md:px-0 md:container md:mx-auto lg:pt-20 lg:max-w-prose bg-blueGray-900">
            <Toolbar />
            <Overview result={result} />
            <ExecutiveSummary result={result} />
            <BusinessBreakdown result={result} />
            <FutureEarningsPerShare result={result} />
            <TerminalValueDerivation result={result} />
            <TargetPriceDerivation result={result} />
            <TargetPriceBreakdown result={result} />
            <Feedback result={result} />
            <Comments result={result} />
            <LegalDisclaimer />
        </main>
    )
}
