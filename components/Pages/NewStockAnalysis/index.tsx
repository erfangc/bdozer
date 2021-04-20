import React, {useState} from 'react'
import {FilingEntity, StockAnalysis2} from "../../../client";
import {Title} from "../../Common/Title";
import {FilingEntitySearch} from "../../FilingEntitySearch";
import {BlockQuote} from "../../Common/BlockQuote";
import {useStockAnalysis} from "../../../api-hooks";
import {v4 as uuid} from 'uuid'
import {useRouter} from "next/router";

export function NewStockAnalysis() {

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const stockAnalysisApi = useStockAnalysis();

    async function handleFilingEntitySelect(filingEntity: FilingEntity) {
        setLoading(true)

        const stockAnalysis: StockAnalysis2 = {
            _id: uuid(),
            cik: filingEntity.cik,
            name: filingEntity.name,
            ticker: filingEntity.tradingSymbol,
        } as any

        await stockAnalysisApi.saveStockAnalysis(stockAnalysis)
        await router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/filing-chooser`)

        setLoading(false)
    }

    return (
        <main className="container mx-auto min-h-screen px-4">
            <div className="space-y-8 flex justify-center flex-col h-full">
                <Title>Create New Analysis</Title>
                <FilingEntitySearch
                    className="w-80 w-full"
                    onSubmit={handleFilingEntitySelect}
                    loading={loading}
                    placeholder="Search Company"
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
