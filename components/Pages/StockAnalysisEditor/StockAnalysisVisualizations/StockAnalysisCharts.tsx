import React, {useEffect, useState} from 'react'
import {useFactBase} from "../../../../api-hooks";
import {year} from "../../../../year";
import {simpleNumber} from "../../../../simple-number";
import {StockAnalysis2} from "../../../../client";
import HighchartsReact from "highcharts-react-official";
import {highcharts} from "../../../../highcharts";
import {Loading} from "../../../Common/Svgs";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function StockAnalysisCharts({stockAnalysis}: Props) {

    const [options, setOptions] = useState<Highcharts.Options>()
    const [loading, setLoading] = useState(true)
    const totalRevenueConceptName = stockAnalysis?.model?.totalRevenueConceptName
    const netIncomeConceptName = stockAnalysis?.model?.netIncomeConceptName

    const revenueItem = stockAnalysis?.model?.incomeStatementItems?.find(it => it.name === totalRevenueConceptName)
    const netIncomeItem = stockAnalysis?.model?.incomeStatementItems?.find(it => it.name === netIncomeConceptName)

    const factBase = useFactBase()

    async function refresh() {
        if (!stockAnalysis) {
            return
        }
        setLoading(true)
        const cells = stockAnalysis?.cells || []
        const revenueHistoricalValue = revenueItem?.historicalValue;
        const netIncomeHistoricalValue = netIncomeItem?.historicalValue;
        const revenueFactIds = (revenueHistoricalValue?.factId ? [revenueHistoricalValue.factId] : revenueHistoricalValue?.factIds) ?? []
        const netIncomeFactIds = (netIncomeHistoricalValue?.factId ? [netIncomeHistoricalValue.factId] : netIncomeHistoricalValue?.factIds) ?? []

        let pastRevenue = []
        let pastNetIncome = []
        try {
            const { data: revenueFactTimeSeries } = await factBase.getAnnualTimeSeries1(revenueFactIds)
            pastRevenue = revenueFactTimeSeries.map(fact => {
                return {
                    x: new Date(fact.documentPeriodEndDate).getFullYear(),
                    y: fact.value,
                }
            })
            const { data: netIncomeFactTimeSeries } = await factBase.getAnnualTimeSeries1(netIncomeFactIds)
            pastNetIncome = netIncomeFactTimeSeries.map(fact => {
                return {
                    x: new Date(fact.documentPeriodEndDate).getFullYear(),
                    y: fact.value,
                }
            })
        } catch (e) {

        }

        /*
         Revenue
         */
        const futureRevenue = cells
            .filter(cell => cell.item.name === revenueItem?.name && cell.period !== 0)
            .map(cell => {
                return {
                    x: year(cell.period),
                    y: cell.value,
                }
            })

        /*
         Net Income
         */
        const futureNetIncome = cells
            .filter(cell => cell.item.name === netIncomeItem?.name && cell.period !== 0)
            .map(cell => {
                return {
                    x: year(cell.period),
                    y: cell.value,
                }
            })

        const options: Highcharts.Options = {
            chart: {
                type: 'column',
                height: 192,
            },
            title: { text: null, },
            yAxis: {
                title: { text: null, },
                labels: {
                    formatter: function () {
                        return `${simpleNumber(this.value)}`
                    }
                }
            },
            series: [
                { data: pastRevenue, name: 'Past Revenue', },
                { data: futureRevenue, name: 'Projected Revenue', },
                { data: pastNetIncome, name: 'Past Net Income', },
                { data: futureNetIncome, name: 'Projected Net Income', }
            ] as any
        }
        setOptions(options)
        setLoading(false)
    }

    useEffect(() => {
        refresh()
    }, [stockAnalysis])

    return (
        <div>
            {loading
                ?
                <div className="h-48 flex items-center justify-center"><Loading/> Loading</div>
                :
                <HighchartsReact highcharts={highcharts} options={options} />
            }
        </div>
    )
}