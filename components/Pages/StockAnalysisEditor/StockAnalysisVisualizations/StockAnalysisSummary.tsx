import React, {ReactNode, useState} from 'react'
import {StockAnalysis2} from '../../../../client'
import {CardPercent, Money, Number} from '../../../Common/Card'
import {highcharts} from "../../../../highcharts";
import HighchartsReact from "highcharts-react-official";
import {StockAnalysisCharts} from "./StockAnalysisCharts";

interface Props {
    stockAnalysis: StockAnalysis2
    loading: boolean
}

export default function StockAnalysisSummary(props: Props) {

    const { stockAnalysis, loading } = props
    const [tab, setTab] = useState<'cards' | 'chart'>('cards')

    const derivedStockAnalytics = stockAnalysis?.derivedStockAnalytics;
    const targetPrice = derivedStockAnalytics?.targetPrice;
    const currentPrice = derivedStockAnalytics?.currentPrice;

    let component: ReactNode = null
    const terminalPe = 1.0 / (derivedStockAnalytics?.discountRate - stockAnalysis?.model?.terminalGrowthRate)
    if (tab === 'cards') {
         stockAnalysis !== undefined
            ?
            component = (
                <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    <Money value={currentPrice} label={"Current Price"} running={loading} />
                    <Money
                        value={targetPrice}
                        label={"Target Price"}
                        state={targetPrice < currentPrice ? 'danger' : 'good'}
                        running={loading}
                    />
                    <CardPercent value={stockAnalysis?.model?.terminalGrowthRate} label={"Terminal Growth Rate"} running={loading} />
                    <CardPercent value={derivedStockAnalytics?.discountRate} label={"Discount Rate"} running={loading} />
                    <CardPercent value={derivedStockAnalytics?.revenueCAGR} label={"Revenue CAGR"} running={loading} />
                    <Number value={terminalPe} label={"Terminal Year P/E"} running={loading} />
                </div>
            )
            : null
    } else {
        component = <div>
                <StockAnalysisCharts stockAnalysis={props.stockAnalysis}/>
            </div>
    }
    return (
        <div>
            <div className="flex mb-4">
                <button className={`text-blueGray-200 text-sm px-2 w-32 py-1.5 transition ease-out rounded-l-xl ${tab === 'cards' ? 'bg-blueGray-700' : 'bg-blueGray-800'} focus:outline-none`} onClick={() => setTab('cards')}>Cards</button>
                <button className={`text-blueGray-200 text-sm px-2 w-32 py-1.5 transition ease-out rounded-r-xl ${tab === 'chart' ? 'bg-blueGray-700' : 'bg-blueGray-800'} focus:outline-none`} onClick={() => setTab('chart')}>Chart</button>
            </div>
            {component}
        </div>
    )
}
