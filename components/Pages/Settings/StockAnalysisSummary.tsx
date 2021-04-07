import { useRouter } from 'next/router'
import React from 'react'
import { StockAnalysis2 } from '../../../client'
import { Card, CardPercent } from '../../Common/Card'

interface Props {
    stockAnalysis: StockAnalysis2
    loading: boolean
}

export default function AnalysisSummary(props: Props) {

    const { stockAnalysis, loading } = props
    const router = useRouter()

    return stockAnalysis !== undefined
        ?
        <div>
            <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
                <Card value={stockAnalysis?.derivedStockAnalytics?.currentPrice} label={"Current Price"} running={loading} />
                <Card value={stockAnalysis?.derivedStockAnalytics?.targetPrice} label={"Target Price"} running={loading} />
                <Card value={stockAnalysis?.derivedStockAnalytics?.zeroGrowthPrice} label={"Zero Growth Price"} running={loading} />
                <CardPercent value={stockAnalysis?.derivedStockAnalytics?.revenueCAGR} label={"Revenue CAGR"} running={loading} />
            </div>
        </div>
        : null
}
