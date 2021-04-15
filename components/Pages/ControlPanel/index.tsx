import React, {useEffect, useState} from "react";
import {useStockAnalysisCrud} from "../../../api-hooks";
import {StockAnalysis2} from "../../../client";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {Title} from "../../Common/Title";
import {LoadingSkeletons, StockAnalysisCard} from "./StockAnalysisCard";
import {useRouter} from "next/router";
import {Plus} from "../../Common/Svgs";

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis2[]>([])
    const [loadingAnalyses, setLoadingAnalyses] = useState(false)

    async function init() {
        setLoadingAnalyses(true)
        const resp = await stockAnalysisCrud.findStockAnalyses()
        setStockAnalyses(resp.data)
        setLoadingAnalyses(false)
    }

    async function deleteStockAnalysis(id: string) {
        await stockAnalysisCrud.deleteStockAnalysis(id)
        await init()
    }

    function navigateToNew() {
        router.push('/control-panel/stock-analyses/new')
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <main className="text-blueGray-50 container mx-auto space-y-20 py-20 px-4">
            <Title>Existing Analyses</Title>
            <PrimaryButton className="flex items-center" onClick={navigateToNew}><Plus/>Create New</PrimaryButton>
            <div className="space-y-8">
                <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {loadingAnalyses ? <LoadingSkeletons/> : null}
                    {
                        stockAnalyses
                            .map(stockAnalysis => (
                                <StockAnalysisCard
                                    key={stockAnalysis['_id']}
                                    stockAnalysis={stockAnalysis}
                                    onDelete={deleteStockAnalysis}
                                />
                            ))
                    }
                </ul>
            </div>
        </main>
    )
}

