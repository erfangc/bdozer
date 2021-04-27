import React from "react";
import {StockAnalysis2} from "../../../client";
import {LegalDisclaimer} from "../../LegalDisclaimer";
import {BusinessBreakdown} from "./Sections/BusinessBreakdown";
import {Comments} from "./Sections/Comments";
import {ExecutiveSummary} from "./Sections/ExecutiveSummary";
import {Feedback} from "./Sections/Feedback";
import {FutureEarningsPerShare} from "./Sections/FutureEarningsPerShare";
import {Overview} from "./Sections/Overview";
import {TargetPriceBreakdown} from "./Sections/TargetPriceBreakdown";
import {TargetPriceDerivation} from "./Sections/TargetPriceDerivation";
import {TerminalValueDerivation} from "./Sections/TerminalValueDerivation";
import {Toolbar} from "./Toolbar";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Narrative2(props: Props) {
    const { stockAnalysis } = props;
    return (
        <main className="px-4 py-20 container mx-auto max-w-prose overflow-x-scroll md:overflow-x-hidden">
            <Toolbar stockAnalysis={stockAnalysis}/>
            <div className="flex flex-col space-y-20 py-0 lg:py-20">
                <Overview result={stockAnalysis} />
                <ExecutiveSummary result={stockAnalysis} />
                <BusinessBreakdown result={stockAnalysis} />
                <FutureEarningsPerShare result={stockAnalysis} />
                <TerminalValueDerivation result={stockAnalysis} />
                <TargetPriceDerivation result={stockAnalysis} />
                <TargetPriceBreakdown result={stockAnalysis} />
                <Feedback result={stockAnalysis} />
                <Comments result={stockAnalysis} />
                <LegalDisclaimer />
            </div>
        </main>
    )
}
