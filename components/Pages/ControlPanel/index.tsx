import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFilingEntityManager, useStockAnalysisCrud, useStockAnalysisWorkflow } from "../../../api-hooks";
import { StockAnalysis2, FilingEntity } from "../../../client";
import { DeleteButton } from "../../Common/DeleteButton";
import { PrimaryButton } from "../../Common/PrimaryButton";
import { Title, SubTitle } from "../../Common/Title";
import { FilingEntitySearch } from "../FilingEntitySearch";

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const filingEntityManager = useFilingEntityManager()
    const stockAnalysisWorkflow = useStockAnalysisWorkflow()
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis2[]>([])
    const [loading, setLoading] = useState(false)

    async function init() {
        const resp = await stockAnalysisCrud.findStockAnalyses()
        setStockAnalyses(resp.data)
    }

    async function createNewStockAnalysis(filingEntity: FilingEntity) {
        //
        // Bootstrap facts and take the user to the entity page instead of the analysis page
        //
        if (filingEntity?.statusMessage !== 'Completed') {
            navigateToEntity(filingEntity.cik)
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

    function navigateToStockAnalysis(id: string) {
        router.push(`/control-panel/stock-analyses/${id}`)
    }

    function navigateToEntity(cik: string) {
        router.push(`/control-panel/filing-entities/${cik}`)
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
                <FilingEntitySearch onSubmit={createNewStockAnalysis} className="w-80 lg:w-full" loading={loading} />
            </div>
            <div className="space-y-8">
                <SubTitle>Existing Analyses</SubTitle>
                <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {
                        stockAnalyses.map(stockAnalysis => {
                            const { ticker, name, lastUpdated } = stockAnalysis
                            const id = stockAnalysis['_id']
                            return (
                                <li key={id} className="px-4 py-6 bg-blueGray-700 flex justify-between rounded-md">
                                    <div className="flex flex-col space-y-3">
                                        <span className="text-xl font-extrabold">{ticker}</span>
                                        <span className="text-blueGray-300">{name}</span>
                                        <span className="text-xs">{new Date(lastUpdated).toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <PrimaryButton onClick={() => navigateToStockAnalysis(id)}>View</PrimaryButton>
                                        <DeleteButton onClick={() => deleteStockAnalysis(id)}>Delete</DeleteButton>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </main>
    )
}
