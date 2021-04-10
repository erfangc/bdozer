import React from 'react'
import { StockAnalysis2 } from '../../../../client'
import { CardPercent, Money, Number } from '../../../Common/Card'

interface Props {
    stockAnalysis: StockAnalysis2
    loading: boolean
}

export default function AnalysisSummary(props: Props) {

    const { stockAnalysis, loading } = props

    return stockAnalysis !== undefined
        ?
        <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <Money value={stockAnalysis?.derivedStockAnalytics?.currentPrice} label={"Current Price"} running={loading} />
            <Money value={stockAnalysis?.derivedStockAnalytics?.targetPrice} label={"Target Price"} running={loading} />
            <Money value={stockAnalysis?.derivedStockAnalytics?.zeroGrowthPrice} label={"Zero Growth Price"} running={loading} />
            <CardPercent value={stockAnalysis?.model?.terminalGrowthRate} label={"Terminal Growth Rate"} running={loading} />
            <CardPercent value={stockAnalysis?.derivedStockAnalytics?.discountRate} label={"Discount Rate"} running={loading} />
            <CardPercent value={stockAnalysis?.derivedStockAnalytics?.revenueCAGR} label={"Revenue CAGR"} running={loading} />
        </div>
        : null
}
