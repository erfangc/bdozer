import {StockAnalysis2} from "../../../client";
import {WatchingButton} from "../StockAnalysis/Overview/WatchingButton/WatchingButton";
import {Statistic} from "./Statistic";
import React from "react";
import {useRouter} from "next/router";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function StockAnalysisCard({stockAnalysis}: Props) {
    const {
        ticker,
        name,
        lastUpdated,
    } = stockAnalysis;
    const stockAnalysisId = stockAnalysis['_id'];
    const router = useRouter();

    function navigate() {
        router.push(`/stock-analyses/${stockAnalysisId}`);
    }

    return (
        <div className="p-6 rounded-lg bg-navy-100 w-mobileCard lg:w-card text-lightGreen-25 cursor-pointer" onClick={navigate}>
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center flex-col lg:flex-row">
                        <h1 className="heading1 self-start text-lime-100">{ticker}</h1>
                        <span className="lg:border-l lg:pl-4 lg:ml-4">{name}</span>
                    </div>
                    <div className="text-xs leading-4 text-lightGreen-25 hidden lg:block">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <WatchingButton stockAnalysis={stockAnalysis}/>
                </div>
            </div>
            <Statistic stockAnalysis={stockAnalysis}/>
        </div>
    )
}