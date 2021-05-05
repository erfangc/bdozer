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
import {TocScrollspy} from "./TocScrollspy";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Narrative2(props: Props) {
    const {stockAnalysis} = props;
    return (
        <main className="container mx-auto max-w-prose">
            <Toolbar stockAnalysis={stockAnalysis}/>
            <TocScrollspy stockAnalysis={stockAnalysis}/>
            <div className="flex flex-col space-y-20 px-4 pt-16 overflow-x-scroll md:overflow-x-hidden">
                <Overview stockAnalysis={stockAnalysis}/>
                <Summary stockAnalysis={stockAnalysis}/>
                <BusinessBreakdown stockAnalysis={stockAnalysis}/>
                <FutureEarningsPerShare stockAnalysis={stockAnalysis}/>
                <TerminalValueCalculation2 stockAnalysis={stockAnalysis}/>
                <FairValueDerivation stockAnalysis={stockAnalysis}/>
                <Comments stockAnalysis={stockAnalysis}/>
                <LegalDisclaimer/>
            </div>
        </main>
    )
}
