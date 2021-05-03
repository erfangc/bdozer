import React from "react";
import {StockAnalysis2} from "../../../client";
import {LegalDisclaimer} from "../../LegalDisclaimer";
import {BusinessBreakdown} from "./Sections/BusinessBreakdown";
import {Comments} from "./Sections/Comments";
import {Summary} from "./Sections/Summary";
import {Feedback} from "./Sections/Feedback";
import {FutureEarningsPerShare} from "./Sections/FutureEarningsPerShare";
import {Overview} from "./Sections/Overview";
import {TargetPriceBreakdown} from "./Sections/TargetPriceBreakdown";
import {FairValueDerivation} from "./Sections/FairValueDerivation";
import {TerminalValueDerivation} from "./Sections/TerminalValueDerivation";
import {Toolbar} from "./Toolbar";
import {TerminalValueCalculation2} from "./Sections/TerminalValueCalculation2";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Narrative2(props: Props) {
    const { stockAnalysis } = props;
    return (
        <main className="px-4 container mx-auto max-w-prose overflow-x-scroll md:overflow-x-hidden">
            <Toolbar stockAnalysis={stockAnalysis}/>
            <div className="flex flex-col space-y-20">
                <Overview result={stockAnalysis} />
                <Summary stockAnalysis={stockAnalysis} />
                <BusinessBreakdown stockAnalysis={stockAnalysis} />
                <FutureEarningsPerShare result={stockAnalysis} />
                <TerminalValueCalculation2 stockAnalysis={stockAnalysis} />
                <FairValueDerivation result={stockAnalysis} />
                <Feedback result={stockAnalysis} />
                <Comments result={stockAnalysis} />
                <LegalDisclaimer />
            </div>
        </main>
    )
}
