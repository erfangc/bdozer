import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {StockAnalysisProjection} from '../../../client'
import {LegalDisclaimer} from '../../LegalDisclaimer'
import {StockAnalysisCard} from './StockAnalysisCard'
import {StockAnalysisSearch} from './StockAnalysisSearch'
import {LoadingSkeletons} from "./LoadingSkeleton";
import {usePublishedStockAnalysis} from "../../../api-hooks";

export function Browse() {
    const stockAnalysisPublication = usePublishedStockAnalysis()
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysisProjection[]>([])
    const [loading, setLoading] = useState(false)
    const [underValuedFilter, setUndervaluedFilter] = useState(false)

    function toggleUnderValued() {
        const underValuedOnly = !underValuedFilter
        setUndervaluedFilter(underValuedOnly);
    }

    async function refresh() {
        setLoading(true)
        const {data: resp} = await stockAnalysisPublication.findPublishedStockAnalyses(
            undefined,
            undefined,
            undefined,
            undefined,
            500,
            undefined,
        )
        setStockAnalyses(resp.stockAnalyses)
        setLoading(false)
    }

    useEffect(() => {
        refresh()
    }, [])

    const router = useRouter()

    function navigate(stockAnalysis: StockAnalysisProjection) {
        router.push(`/published-stock-analyses/${stockAnalysis['_id']}/narrative2`)
    }

    const filteredStockAnalyses = underValuedFilter ? stockAnalyses.filter(sa => sa.currentPrice < sa.targetPrice) : stockAnalyses;
    return (
        <main className="min-h-screen mx-auto container px-2 flex flex-col justify-between max-w-prose">
            <section>
                <StockAnalysisSearch onSubmit={stockAnalysis => navigate(stockAnalysis)} className="mb-20 mt-16"/>
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex space-x-4 items-center">
                        <b>Filters:</b> <StockTab active={underValuedFilter} onClick={toggleUnderValued}>undervalued
                        stocks</StockTab>
                    </div>
                </div>
                <blockquote className="my-4 pl-6 border-l-4 bg-blueGray-800 py-2 text-sm text-blueGray-300">
                    Click on the Cards to View Analysis
                </blockquote>
                <div className="flex flex-col space-y-6">
                    {loading ? <LoadingSkeletons/> : null}
                    {
                        filteredStockAnalyses
                            .map(stockAnalysis => (
                                <StockAnalysisCard
                                    key={stockAnalysis['_id']}
                                    stockAnalysis={stockAnalysis}
                                />
                            ))
                    }
                </div>
            </section>
            <LegalDisclaimer className="mt-20"/>
        </main>
    )
}

function SortIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
        </svg>
    )
}

interface StockTabProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    active?: boolean
}

function StockTab({active, className, children, ...props}: StockTabProps) {
    return (
        <button
            className={`focus:outline-none px-2 py-1 rounded font-extrabold uppercase transition ${active ? 'bg-blue-500' : 'border-blueGray-500 bg-blueGray-700 shadow-lg hover:bg-blue-500 hover:border-0'} ease-linear ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}