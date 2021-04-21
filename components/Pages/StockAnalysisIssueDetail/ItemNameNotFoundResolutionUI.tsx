import {useRouter} from "next/router";
import {useIssues, useStockAnalysis} from "../../../api-hooks";
import React, {Fragment, useEffect, useState} from "react";
import {Issue, IssueIssueTypeEnum, Item, StockAnalysis2} from "../../../client";
import {Listbox, Transition} from "@headlessui/react";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {SecondaryButton} from "../../Common/SecondaryButton";
import {Loading} from "../../Common/Svgs";

interface Props {
    issue: Issue
}

function Check() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
        </svg>
    )
}

export function ItemNameNotFoundResolutionUI(props: Props) {

    const {issue} = props
    const issuesApi = useIssues()
    const router = useRouter()
    const {id} = router.query
    const stockAnalysisApi = useStockAnalysis()
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()
    const [processing, setProcessing] = useState(false)

    const [selected, setSelected] = useState<Item>()

    function goBack() {
        router.back()
    }

    async function init() {
        const {data: stockAnalysis} = await stockAnalysisApi.getStockAnalysis(id as string)
        setStockAnalysis(stockAnalysis)
    }

    async function handleSubmit() {
        setProcessing(true)
        const issueType = issue.issueType
        let updatedStockAnalysis = {...stockAnalysis}
        switch (issueType) {
            case IssueIssueTypeEnum.EpsItemNotFound:
                updatedStockAnalysis.model = {
                    ...stockAnalysis.model,
                    epsConceptName: selected.name,
                }
                break;
            case IssueIssueTypeEnum.NetIncomeItemNotFound:
                updatedStockAnalysis.model = {
                    ...stockAnalysis.model,
                    netIncomeConceptName: selected.name,
                }
                break;
            case IssueIssueTypeEnum.RevenueItemNotFound:
                updatedStockAnalysis.model = {
                    ...stockAnalysis.model,
                    totalRevenueConceptName: selected.name,
                }
                break;
            case IssueIssueTypeEnum.SharesOutstandingItemNotFound:
                updatedStockAnalysis.model = {
                    ...stockAnalysis.model,
                    sharesOutstandingConceptName: selected.name,
                }
                break;
            default:
                break;
        }
        await issuesApi.deleteIssue(issue['_id'])
        // call APIs to update
        await stockAnalysisApi.saveStockAnalysis(updatedStockAnalysis)
        const {data: issues} = await issuesApi.generateIssues(updatedStockAnalysis)
        await issuesApi.saveIssues(issues)
        setProcessing(false)
        router.push(`/control-panel/stock-analyses/${id}/issues-summary`)
    }

    useEffect(() => {
        init()
    }, [])

    const items = stockAnalysis?.model?.incomeStatementItems ?? []
    return (
        <div>
            <p className="mb-6 mt-12">{issue.message}. Choose an item from below to represent it, then click Confirm</p>
            <Listbox value={selected} onChange={setSelected}>
                {({open}) => (
                    <>
                        <Listbox.Button
                            className="px-4 p-3 w-full rounded bg-blueGray-800 w-80 relative flex justify-between">
                            <span>{selected?.description ?? selected?.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                />
                            </svg>
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options static
                                             className="absolute cursor-pointer mt-1 py-3 bg-blueGray-700 max-w-prose flex flex-col rounded"
                                             as="ul">
                                {items.map(item => (
                                    <Listbox.Option key={item.name} value={item} as={Fragment}>
                                        {({selected, active}) => {
                                            // content of the text box
                                            return (
                                                <li className={`px-1 py-2 overflow-hidden overflow-ellipsis flex ${active || selected ? 'bg-blueGray-900' : ''}`}>
                                                    {selected ? <Check/> : <span className="w-6 h-6 mr-1"/>}
                                                    <p>{item.description ?? item.name}</p>
                                                    {/*<code className="text-xs p-1 rounded bg-blue-600">tag: {item.name}</code>*/}
                                                </li>
                                            )
                                        }}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
            <div className="flex space-x-2 mt-4">
                <PrimaryButton onClick={handleSubmit} disabled={!selected || processing}>{processing ? <><Loading/> Processing</> : <span>Confirm</span>}</PrimaryButton>
                <SecondaryButton onClick={goBack}>Back</SecondaryButton>
            </div>
        </div>
    )
}