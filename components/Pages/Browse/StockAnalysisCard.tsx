import { useRouter } from 'next/router'
import React from 'react'
import { StockAnalysis } from '../../../client'

export function StockAnalysisCard(props: { stockAnalysis: StockAnalysis }) {
    const router = useRouter()

    const { stockAnalysis } = props
    const { currentPrice, targetPrice, model: { symbol, name, cik } } = stockAnalysis
    const percentUpside = (targetPrice / currentPrice - 1) * 100

    function navigate(cik: string) {
        router.push(`/${cik}/narrative2`)
    }

    return (
        <div
            key={cik}
            className="bg-blueGray-700 px-6 py-6 shadow-md flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear"
            onClick={() => navigate(stockAnalysis['_id'])}
        >
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                    <span className="text-lg underline text-blue-400">{name}</span>
                    <span className="text-4xl text-blueGray-200 font-bold tracking-tight">{symbol}</span>
                </div>
                <span className="flex space-x-4">
                    <div>
                        <div className="uppercase text-sm text-blueGray-300">Target Price</div>
                        <div className="font-extrabold">${targetPrice.toFixed(1)}</div>
                    </div>
                    <div>
                        <div className="uppercase text-sm text-blueGray-300">{percentUpside > 0 ? 'Upside' : 'Downside'}</div>
                        <div className={`font-extrabold ${percentUpside > 0 ? 'text-lime-500' : 'text-red-500'}`}>{percentUpside.toFixed(1)}%</div>
                    </div>
                </span>
            </div>
        </div>
    )
}
