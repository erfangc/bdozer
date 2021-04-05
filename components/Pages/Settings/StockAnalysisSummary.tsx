import { useRouter } from 'next/router'
import React from 'react'
import { StockAnalysis } from '../../../client'
import { Card, CardPercent } from '../../Common/Card'
import { GhostButton } from '../../Common/GhostButton'
interface Props {
    stockAnalysis: StockAnalysis
    loading: boolean
}
export default function AnalysisSummary(props: Props) {
    const { stockAnalysis, loading } = props
    const router = useRouter()
    function viewModel() {
        router.push(`/${stockAnalysis?.cik}/narrative2`)
    }

    function viewFullModel() {
        router.push(`/settings/${stockAnalysis?.cik}/full-model`)
    }

    return stockAnalysis !== undefined
        ?
        <div>
            <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
                <Card value={stockAnalysis.currentPrice} label={"Current Price"} running={loading} />
                <Card value={stockAnalysis.targetPrice} label={"Target Price"} running={loading} />
                <Card value={stockAnalysis.zeroGrowthPrice} label={"Zero Growth Price"} running={loading} />
                <CardPercent value={stockAnalysis.revenueCAGR} label={"Revenue CAGR"} running={loading} />
            </div>
            <div className="space-x-2">
                <GhostButton onClick={viewModel}>
                    Narrative Model
                                </GhostButton>
                <GhostButton onClick={viewFullModel}>
                    See Full Model
                    </GhostButton>
            </div>
        </div>
        : null
}