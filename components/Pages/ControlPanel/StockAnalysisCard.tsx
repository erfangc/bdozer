import {StockAnalysis2} from "../../../client";
import {useRouter} from "next/router";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {DeleteButton} from "../../Common/DeleteButton";
import React from "react";
import {Delete, Edit} from "../../Common/Svgs";
import {Published} from "./Publish";

interface Props {
    stockAnalysis: StockAnalysis2
    onDelete: (string) => void
}

export function StockAnalysisCard({stockAnalysis, onDelete}: Props) {

    const router = useRouter()
    const {ticker, name, lastUpdated} = stockAnalysis
    const id = stockAnalysis['_id']

    function navigateToStockAnalysis(id: string) {
        router.push(`/control-panel/stock-analyses/${id}`)
    }

    return (
        <li key={id} className="px-4 py-6 bg-blueGray-700 flex justify-between relative">
            {stockAnalysis.published ? <Published/> : null}
            <div className="flex flex-col space-y-3">
                <span className="flex items-center space-x-1">
                    <span className="text-xl font-extrabold">{ticker}</span>
                </span>
                <span className="text-blueGray-300 font-extrabold">{name}</span>
                <span className="text-xs text-blueGray-300">{new Date(lastUpdated).toLocaleString()}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <PrimaryButton onClick={() => navigateToStockAnalysis(id)}>
                    <Edit/><span className="pl-1">Edit</span>
                </PrimaryButton>
                <DeleteButton onClick={() => onDelete(id)}>
                    <Delete/><span className="pl-1">Delete</span>
                </DeleteButton>
            </div>
        </li>
    )
}

export function LoadingSkeletons() {
    return <>
        {[1, 2, 3, 4].map(i => (
            <li
                key={i}
                className="bg-blueGray-700 px-6 py-6 shadow-md flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear"
            >
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-4">
                        <span className="w-48 h-8 bg-blueGray-500 animate-pulse"/>
                        <span className="w-48 h-4 bg-blueGray-500 animate-pulse"/>
                        <span className="w-48 h-4 bg-blueGray-500 animate-pulse"/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="w-20 h-8 bg-blueGray-500 animate-pulse"/>
                        <span className="w-20 h-8 bg-blueGray-500 animate-pulse"/>
                    </div>
                </div>
            </li>
        ))}
    </>
}
