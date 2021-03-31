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
                    <div className="flex space-x-4">
                        <StockTab active>#featured stocks</StockTab>
                        {/* <StockTab >#FAANG</StockTab> */}
                    </div>
                </div>
                <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                    {
                        stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis} />)
                    }
                </div>
                <blockquote className="mt-8 pl-6 border-l-4 bg-blueGray-800 py-2 text-sm text-blueGray-300">
                    Click on the Cards to View Analysis
                </blockquote>
            </section>
            <LegalDisclaimer />
        </main>
    )
}

interface StockTabProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    active?: boolean
}

function StockTab({ active, className, children, ...props }: StockTabProps) {
    return (
        <button
            className={`focus:outline-none px-2 py-1 rounded font-extrabold uppercase transition ${active ? 'bg-blue-500 cursor-default' : 'border-blueGray-500 bg-blueGray-700 shadow-lg hover:bg-blue-500 hover:border-0'} ease-linear ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}