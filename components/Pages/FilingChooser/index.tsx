import React, {Fragment, useEffect, useState} from 'react'
import {RadioGroup} from "@headlessui/react";
import {Title} from "../../Common/Title";
import {EdgarFilingMetadata, StockAnalysis2} from "../../../client";
import {useEdgarExplorer, useIssues, useModelBuilderFactory, useStockAnalysis} from "../../../api-hooks";
import {useRouter} from "next/router";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {Loading} from "../../Common/Svgs";

export function FilingChooser() {

    const api = useEdgarExplorer()
    const router = useRouter();
    const stockAnalysisApi = useStockAnalysis();
    const modelBuilderFactory = useModelBuilderFactory()
    const issuesApi = useIssues()

    const [filings, setFilings] = useState<EdgarFilingMetadata[]>([])
    const [processing, setProcessing] = useState(false)
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()
    const [filing, setFiling] = useState<EdgarFilingMetadata>()
    const {id} = router.query

    async function init() {
        const {data: stockAnalysis} = await stockAnalysisApi.getStockAnalysis(id as any)
        setStockAnalysis(stockAnalysis)
        const {data: filings} = await api.searchFilings(stockAnalysis.cik)
        setFilings(filings.slice(0, 6))
    }

    async function confirm() {
        /*
        attempt to generate the model for the analysis
         */
        setProcessing(true)
        try {
            const {data: model} = await modelBuilderFactory.bestEffortModel(stockAnalysis.cik, filing.adsh)
            const updatedStockAnalysis: StockAnalysis2 = {...stockAnalysis, model,}
            const {data: issues} = await issuesApi.generateIssues(updatedStockAnalysis)

            /*
            if there are no issues, run the model
             */
            if (issues.length === 0) {
                const {data: reEvaluatedStockAnalysis} = await stockAnalysisApi.refreshStockAnalysis(updatedStockAnalysis)
                await stockAnalysisApi.saveStockAnalysis(reEvaluatedStockAnalysis)
                await router.push(`/control-panel/stock-analyses/${id}`)
            }
            /*
            if there are issues, take them to the issue summary page
             */
            else {
                await stockAnalysisApi.saveStockAnalysis(updatedStockAnalysis)
                await issuesApi.saveIssues(issues)
                await router.push(`/control-panel/stock-analyses/${id}/issues-summary`)
            }
        } catch (e) {

        }
        setProcessing(false)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <main className="text-blueGray-50 mx-auto container max-w-md flex flex-col px-4 mt-10">
            <Title>Choose a Filing</Title>
            <p className="mt-2 mb-8">
                Facts from the SEC filing you choose will be used to bootstrap the model
            </p>
            <PrimaryButton className="my-4" disabled={filing === undefined || processing} onClick={confirm}>
                {
                    processing
                        ? <><Loading/><span className="pl-1">Processing ...</span></>
                        : <span>Confirm</span>
                }
            </PrimaryButton>
            <RadioGroup value={filing} onChange={setFiling} disabled={processing}>
                {filings.map(filing => (
                    <RadioGroup.Option value={filing} key={filing.adsh} as={Fragment}>
                        {({checked}) => (
                            <div
                                className={`flex p-4 my-4 rounded justify-between shadow-lg ${checked ? 'bg-blue-600' : 'bg-blueGray-800'} focus:outline-none transition ease-in cursor-pointer`}
                            >
                                <div className="flex flex-col space-y-2">
                                    <span className="text-2xl font-extrabold text-blueGray-100">{filing.form}</span>
                                    <span className="text-blueGray-300 text-base">
                                        Filed for {new Date(filing.period_ending).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className={`flex items-center`}>
                                    {
                                        checked
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                      clipRule="evenodd"
                                                />
                                            </svg>
                                            :
                                            <span className="h-10 w-10"/>
                                    }
                                </div>
                            </div>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </main>
    )
}
