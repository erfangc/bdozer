import React from "react";
import { StockAnalysis } from "../../client";
import { LegalDisclaimer } from "../LegalDisclaimer";
import { Comments } from "./Comments";
import { Feedback } from "./Narrative2/Feedback";
import { FutureEarningsPerShare } from "./Narrative2/FutureEarningsPerShare";
import { BusinessBreakdown } from "./Narrative2/Sections/BusinessBreakdown";
import { ExecutiveSummary } from "./Narrative2/Sections/ExecutiveSummary";
import { Overview } from "./Narrative2/Sections/Overview";
import { TargetPriceBreakdown } from "./Narrative2/TargetPriceBreakdown";
import { TargetPriceDerivation } from "./Narrative2/TargetPriceDerivation";
import { TerminalValueDerivation } from "./Narrative2/TerminalValueDerivation";
import { Toolbar } from "./Toolbar";

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
