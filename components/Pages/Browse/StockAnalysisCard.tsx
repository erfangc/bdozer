import Link from 'next/link'
import React from 'react'
import {StockAnalysisProjection} from '../../../client'
import {TrendingDown, TrendingUp} from "../../Common/Svgs";

export function StockAnalysisCard(props: { stockAnalysis: StockAnalysisProjection }) {

    const {stockAnalysis} = props
    const {currentPrice, targetPrice, name, ticker} = stockAnalysis
    const percentUpside = (targetPrice / currentPrice - 1) * 100
    const id = stockAnalysis['_id'];

    const underValued = percentUpside > 0;
    return (
        <Link key={id} href={`/published-stock-analyses/${id}/narrative2`}>
            <a className="bg-blueGray-700 px-6 py-6 shadow rounded flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <span className="text-xl text-blueGray-200 uppercase">{name}</span>
                        <span className="text-4xl text-blueGray-200 font-bold tracking-tight">{ticker}</span>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex space-x-4">
                            <div>
                                <div className="uppercase text-sm text-blueGray-300">Fair Value</div>
                                <div className="font-extrabold">${targetPrice?.toFixed(1)}</div>
                            </div>
                            <div>
                                <div className="uppercase text-sm text-blueGray-300">
                                    {underValued ? 'Upside' : 'Downside'}
                                </div>
                                <div className={`font-extrabold ${underValued ? 'text-lime-500' : 'text-red-500'}`}>
                                    {percentUpside.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                        {underValued ? <TrendingUp className="text-lime-500 h-10 w-10"/> : <TrendingDown className="text-rose-500 h-10 w-10"/>}
                    </div>
                </div>
            </a>
        </Link>
    )
}
