import React, {useState} from 'react'
import {Title} from "../../../Common/Title";
import {FilingEntitySearch} from "../../FilingEntitySearch";
import {FilingEntity} from "../../../../client";
import {useStockAnalysisCrud, useStockAnalysisWorkflow} from "../../../../api-hooks";
import {useRouter} from "next/router";
import {BlockQuote} from "../../../Common/BlockQuote";

export function CreateStockAnalysis() {

    const stockAnalysisCrud = useStockAnalysisCrud()
    const stockAnalysisWorkflow = useStockAnalysisWorkflow()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    function navigateToFilingEntity(cik: string) {
        router.push(`/control-panel/filing-entities/${cik}`)
    }

    function navigateToStockAnalysis(id: string) {
        router.push(`/control-panel/stock-analyses/${id}`)
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
            const {data: stockAnalysis} = await stockAnalysisWorkflow.create(filingEntity.cik)
            await stockAnalysisCrud.saveStockAnalysis(stockAnalysis)
            setLoading(false)
            navigateToStockAnalysis(stockAnalysis['_id'])
        }
    }

    return (
        <main className="container mx-auto min-h-screen px-2">
            <div className="space-y-8 flex justify-center flex-col h-full">
                <Title>Create New Analysis</Title>
                <FilingEntitySearch
                    className="w-80 lg:w-full"
                    onSubmit={handleFilingEntitySelect}
                    loading={loading}
                    placeholder="Search for a company to get started"
                />
                <BlockQuote>
                    <span className="inline-block my-1 p-1 rounded bg-amber-500 text-blueGray-800">Warning</span><br/>
                    We are still early in this project, the process of bootstrapping a company automatically can be fraught with unexpected errors. <br/>
                    If you run into issues, <a className="text-blue-500" href="mailto:erfangc@gmail.com?subject=Stock Modeling Request" target='_blank'>email us</a> the tickers you want to analyze
                    and we can preload the data for you
                </BlockQuote>
            </div>
        </main>
    )
}
