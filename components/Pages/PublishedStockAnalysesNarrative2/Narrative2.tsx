import React from "react";
import {StockAnalysis2} from "../../../client";
import {LegalDisclaimer} from "../../LegalDisclaimer";
import {BusinessBreakdown} from "./Sections/BusinessBreakdown";
import {Comments} from "./Sections/Comments";
import {Summary} from "./Sections/Summary";
import {FutureEarningsPerShare} from "./Sections/FutureEarningsPerShare";
import {Overview} from "./Sections/Overview";
import {FairValueDerivation} from "./Sections/FairValueDerivation";
import {Toolbar} from "./Toolbar";
import {TerminalValueCalculation2} from "./Sections/TerminalValueCalculation2";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Narrative2(props: Props) {
    const {stockAnalysis} = props;
    return (
        <main className="container mx-auto max-w-prose overflow-x-scroll md:overflow-x-hidden">
            <Toolbar stockAnalysis={stockAnalysis}/>
            <div className="flex flex-col space-y-20 px-4 pt-20 lg:pt-32">
                <Overview result={stockAnalysis}/>
                <Summary stockAnalysis={stockAnalysis}/>
                <BusinessBreakdown stockAnalysis={stockAnalysis}/>
                <FutureEarningsPerShare result={stockAnalysis}/>
                <TerminalValueCalculation2 stockAnalysis={stockAnalysis}/>
                <FairValueDerivation result={stockAnalysis}/>
                {/*<Feedback result={stockAnalysis} />*/}
                <Comments result={stockAnalysis}/>
                <LegalDisclaimer/>
            </div>
        </main>
    )
}
