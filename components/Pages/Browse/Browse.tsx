import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { StockAnalysis } from '../../../client'
import { LegalDisclaimer } from '../../LegalDisclaimer'
import { StockAnalysisCard } from './StockAnalysisCard'
import { StockAnalysisSearch } from './StockAnalysisSearch'
interface Props {
    stockAnalyses: StockAnalysis[]
}
export function Browse(props: Props) {
    const router = useRouter()
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis[]>(props.stockAnalyses)

    function navigate(cik: string) {
        router.push(`/${cik}/narrative2`)
    }

    return (
        <main className="min-h-screen mx-auto container px-2 flex flex-col justify-between">
            <section>
                <StockAnalysisSearch onSubmit={({ cik }) => navigate(cik)} className="mb-20 mt-16" />
                <div className="mb-8">
                    <h1 className="border-blueGray-700">
                        <span className="bg-blue-500 px-2 py-1 rounded font-extrabold uppercase">
                            #Featured stocks
                        </span>
                    </h1>
                    <blockquote className="mt-8 pl-6 border-l-4 bg-blueGray-800 py-2 text-sm text-blueGray-300">
                        Click on the Cards to View Analysis
                    </blockquote>
                </div>
                <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                    {
                        stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis} />)
                    }
                </div>
            </section>
            <LegalDisclaimer />
        </main>
    )
}