import React from "react";
import { StockAnalysis } from "../../../client";
import { LegalDisclaimer } from "../../LegalDisclaimer";
import { Comments } from "./Sections/Comments";
import { Feedback } from "./Sections/Feedback";
import { FutureEarningsPerShare } from "./Sections/FutureEarningsPerShare";
import { BusinessBreakdown } from "./Sections/BusinessBreakdown";
import { ExecutiveSummary } from "./Sections/ExecutiveSummary";
import { Overview } from "./Sections/Overview";
import { TargetPriceBreakdown } from "./Sections/TargetPriceBreakdown";
import { TerminalValueDerivation } from "./Sections/TerminalValueDerivation";
import { Toolbar } from "./Toolbar";
import { TargetPriceDerivation } from "./Sections/TargetPriceDerivation";

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
