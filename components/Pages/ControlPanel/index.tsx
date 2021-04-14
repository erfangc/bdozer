import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStockAnalysisCrud, useStockAnalysisWorkflow } from "../../../api-hooks";
import { FilingEntity, StockAnalysis2 } from "../../../client";
import { DeleteButton } from "../../Common/DeleteButton";
import { PrimaryButton } from "../../Common/PrimaryButton";
import { SubTitle, Title } from "../../Common/Title";
import { FilingEntitySearch } from "../FilingEntitySearch";

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const stockAnalysisWorkflow = useStockAnalysisWorkflow()
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis2[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingAnalyses, setLoadingAnalyses] = useState(false)

    async function init() {
        setLoadingAnalyses(true)
        const resp = await stockAnalysisCrud.findStockAnalyses()
        setStockAnalyses(resp.data)
        setLoadingAnalyses(false)
    }

    async function handleFilingEntitySelect(filingEntity: FilingEntity) {
        //
        // Bootstrap facts and take the user to the entity page instead of the analysis page
        //
        if (filingEntity?.statusMessage !== 'Completed') {
            navigateToFilingEntity(filingEntity.cik)
        } else {
            //
            // Otherwise create a new stock analysis and navigate to it
            //
            setLoading(true)
            const { data: stockAnalysis } = await stockAnalysisWorkflow.create(filingEntity.cik)
            await stockAnalysisCrud.saveStockAnalysis(stockAnalysis)
            setLoading(false)
            navigateToStockAnalysis(stockAnalysis['_id'])
        }
    }
    function navigateToFilingEntity(cik: string) {
        router.push(`/control-panel/filing-entities/${cik}`)
    }

    function navigateToStockAnalysis(id: string) {
        router.push(`/control-panel/stock-analyses/${id}`)
    }

    async function deleteStockAnalysis(id: string) {
        await stockAnalysisCrud.deleteStockAnalysis(id)
        await init()
    }

    useEffect(() => { init() }, [])

    return (
        <main className="text-blueGray-50 container mx-auto space-y-20 py-20 px-4">
            <div className="space-y-8">
                <Title>Create New</Title>
                <FilingEntitySearch onSubmit={handleFilingEntitySelect} className="w-80 lg:w-full" loading={loading} />
            </div>
            <div className="space-y-8">
                <SubTitle>Existing Analyses</SubTitle>
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

interface Props {
    stockAnalysis: StockAnalysis2
    onDelete: (string) => void
}

export function StockAnalysisCard({stockAnalysis, onDelete}: Props) {
    const router = useRouter()
    const { ticker, name, lastUpdated } = stockAnalysis
    const id = stockAnalysis['_id']

    function navigateToStockAnalysis(id: string) {
        router.push(`/control-panel/stock-analyses/${id}`)
    }

    return (
        <li key={id} className="px-4 py-6 bg-blueGray-700 flex justify-between">
            <div className="flex flex-col space-y-3">
                <span className="text-xl font-extrabold">{ticker}</span>
                <span className="text-blueGray-300">{name}</span>
                <span className="text-xs">{new Date(lastUpdated).toLocaleString()}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <PrimaryButton onClick={() => navigateToStockAnalysis(id)}>View</PrimaryButton>
                <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
            </div>
        </li>
    )
}

export function LoadingSkeletons() {
    return <>
        {[1, 2, 3].map(i => (
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
