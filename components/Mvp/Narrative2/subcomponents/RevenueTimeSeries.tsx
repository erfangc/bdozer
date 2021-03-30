import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import { useFactBase, useFactBaseUnsecured } from '../../../../api-hooks'
import { StockAnalysis } from '../../../../client'
import { highcharts } from '../../../../highcharts'
import { simpleNumber } from '../../../../simple-number'
import { year } from '../../../../year'

interface Props {
    result: StockAnalysis
}

export function RevenueTimeSeries({ result }: Props) {

    const [options, setOptions] = useState<Highcharts.Options>()
    const factBase = useFactBaseUnsecured()
    const { cells } = result
    const revenue = result.businessWaterfall[0]?.revenue
    const factId = revenue?.item?.historicalValue?.factId

    async function refresh() {
        const { data: factTimeSeries } = await factBase.getFactTimeSeries(factId)

        const futureData = cells
            .filter(cell => cell.item.name === revenue?.item.name && cell.period !== 0).map(cell => {
                return {
                    x: year(cell.period),
                    y: cell.value,
                }
            })

        const pastData = factTimeSeries.fyFacts.map(fact => {
            return {
                x: new Date(fact.documentPeriodEndDate).getFullYear(),
                y: fact.doubleValue,
            }
        })

        const options: Highcharts.Options = {
            chart: {
                type: 'column',
                height: 300
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
            plotOptions: {
                column: {
                    pointPadding: 0, pointWidth: 20
                }
            },
            xAxis: { lineWidth: 0, },
            series: [
                {
                    data: pastData, name: 'Past Revenue',
                },
                {
                    data: futureData, name: 'Projected Revenue',
                }
            ] as any
        }
        setOptions(options)
    }

    useEffect(() => {
        refresh()
    }, [])

    return (
        <div>
            <p className="mb-8">
                See past revenue and median analyst projection for revenue going forward
            </p>
            <HighchartsReact highcharts={highcharts} options={options} />
        </div>
    )
}