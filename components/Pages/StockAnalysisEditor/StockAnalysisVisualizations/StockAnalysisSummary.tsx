import React, {ReactNode, useState} from 'react'
import {StockAnalysis2} from '../../../../client'
import {CardPercent, Money} from '../../../Common/Card'
import {highcharts} from "../../../../highcharts";
import HighchartsReact from "highcharts-react-official";
import {StockAnalysisCharts} from "./StockAnalysisCharts";

interface Props {
    stockAnalysis: StockAnalysis2
    loading: boolean
}

export default function AnalysisSummary(props: Props) {

    const { stockAnalysis, loading } = props
    const [tab, setTab] = useState<'cards' | 'chart'>('cards')

    const targetPrice = stockAnalysis?.derivedStockAnalytics?.targetPrice;
    const currentPrice = stockAnalysis?.derivedStockAnalytics?.currentPrice;

    let component: ReactNode = null
    if (tab === 'cards') {
         stockAnalysis !== undefined
            ?
            component = <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                <Money value={currentPrice} label={"Current Price"} running={loading} />
                <Money
                    value={targetPrice}
                    label={"Target Price"}
                    state={targetPrice < currentPrice ? 'danger' : 'good'}
                    running={loading}
                />
                <CardPercent value={stockAnalysis?.model?.terminalGrowthRate} label={"Terminal Growth Rate"} running={loading} />
                <CardPercent value={stockAnalysis?.derivedStockAnalytics?.discountRate} label={"Discount Rate"} running={loading} />
                <CardPercent value={stockAnalysis?.derivedStockAnalytics?.revenueCAGR} label={"Revenue CAGR"} running={loading} />
            </div>
            : null
    } else {
        component = <div>
                <StockAnalysisCharts stockAnalysis={props.stockAnalysis}/>
            </div>
    }
    return (
        <div>
            {component}
            <div className="flex space-x-1 mt-2">
                <button className={`px-2 py-1 rounded-xl ${tab === 'cards' ? 'bg-blueGray-700' : 'bg-blueGray-800'} focus:outline-none`} onClick={() => setTab('cards')}>Cards</button>
                <button className={`px-2 py-1 rounded-xl ${tab === 'chart' ? 'bg-blueGray-700' : 'bg-blueGray-800'} focus:outline-none`} onClick={() => setTab('chart')}>Chart</button>
            </div>
        </div>
    )
}
