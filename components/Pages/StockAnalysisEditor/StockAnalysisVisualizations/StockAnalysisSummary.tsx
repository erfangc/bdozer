import React, {ReactNode, useState} from 'react'
import {StockAnalysis2} from '../../../../client'
import {CardPercent, Money, Number} from '../../../Common/Card'
import {StockAnalysisCharts} from "./StockAnalysisCharts";

interface Props {
    stockAnalysis: StockAnalysis2
    loading: boolean
}

export default function StockAnalysisSummary(props: Props) {

    const {stockAnalysis, loading} = props
    const [tab, setTab] = useState<'cards' | 'chart'>('cards')

    const derivedStockAnalytics = stockAnalysis?.derivedStockAnalytics;
    const targetPrice = derivedStockAnalytics?.targetPrice;
    const currentPrice = derivedStockAnalytics?.currentPrice;

    let component: ReactNode
    const terminalPe = 1.0 / (derivedStockAnalytics?.discountRate - stockAnalysis?.model?.terminalGrowthRate)
    if (tab === 'cards') {
            component = (
                <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    <Money
                        value={currentPrice}
                        label={"Current Price"}
                        running={loading}
                    />
                    <Money
                        value={targetPrice}
                        label={"Target Price"}
                        state={targetPrice < currentPrice ? 'danger' : 'good'}
                        running={loading}
                    />
                    <CardPercent
                        value={stockAnalysis?.model?.terminalGrowthRate}
                        label={"Terminal Growth Rate"}
                        running={loading}
                    />
                    <CardPercent
                        value={derivedStockAnalytics?.revenueCAGR}
                        label={"Revenue CAGR"}
                        running={loading}
                    />
                    <Number
                        value={terminalPe}
                        label={"Terminal Year P/E"}
                        running={loading}
                    />
                    <CardPercent
                        value={derivedStockAnalytics?.irr}
                        label={"IRR"}
                        running={loading}
                    />
                </div>
            )
    } else {
        component = <StockAnalysisCharts stockAnalysis={props.stockAnalysis}/>
    }

    return (
        <div>
            <div className="flex mb-4">
                <Button onClick={() => setTab('cards')} active={tab === 'cards'} className="rounded-l-xl">
                    Cards
                </Button>
                <Button onClick={() => setTab('chart')} active={tab === 'chart'} className="rounded-r-xl">
                    Chart
                </Button>
            </div>
            {component}
        </div>
    )
}

function Button({
                    active,
                    children,
                    className,
                    ...props
                }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { active: boolean }) {
    return (
        <button
            className={`text-blueGray-200 text-sm px-2 w-32 py-1.5 transition ease-out ${active ? 'bg-blueGray-700' : 'bg-blueGray-800'} hover:bg-blueGray-700 focus:outline-none ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}