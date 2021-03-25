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
                <div className="shadow-md bg-blueGray-700 px-2 py-2 flex space-x-10 fixed bottom-0 left-0 lg:left-20 right-0 justify-center z-10">
                    <ToolButton>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="#CBD5E1" />
                        </svg>
                        Assumptions
                    </ToolButton>
                    <ToolButton>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.17 4L18 8.83V20H6V4H13.17ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM15 11H11V12H14C14.55 12 15 12.45 15 13V16C15 16.55 14.55 17 14 17H13V18H11V17H9V15H13V14H10C9.45 14 9 13.55 9 13V10C9 9.45 9.45 9 10 9H11V8H13V9H15V11Z" fill="#CBD5E1" />
                        </svg>
                        Request Stock
                    </ToolButton>
                    <ToolButton>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0C0.51 19.16 5.66 24 11.95 24C12.18 24 12.39 23.98 12.61 23.97L8.8 20.15L7.47 21.49V21.49ZM12.05 0C11.82 0 11.61 0.02 11.39 0.04L15.2 3.85L16.53 2.52C19.8 4.07 22.14 7.24 22.5 11H24C23.49 4.84 18.34 0 12.05 0ZM16 14H18V8C18 6.89 17.1 6 16 6H10V8H16V14ZM8 16V4H6V6H4V8H6V16C6 17.1 6.89 18 8 18H16V20H18V18H20V16H8Z" fill="#CBD5E1" />
                        </svg>
                        Size Trade
                    </ToolButton>
                </div>
                <Overview result={result} />
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

function ToolButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={`text-blueGray-50 px-2 py-2 text-sm font-light rounded-md focus:outline-none flex flex-col hover:bg-blueGray-600 justify-center items-center ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}