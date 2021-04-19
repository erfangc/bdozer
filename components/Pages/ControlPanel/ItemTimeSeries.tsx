import HighchartsReact from 'highcharts-react-official'
import React, {useEffect, useState} from 'react'
import {useFactBaseUnsecured} from '../../../api-hooks'
import {Item, StockAnalysis2} from '../../../client'
import {highcharts} from '../../../highcharts'
import {simpleNumber} from '../../../simple-number'
import {year} from '../../../year'

interface Props {
    result: StockAnalysis2
    item: Item
}

export function ItemTimeSeries({ result, item }: Props) {

    const [options, setOptions] = useState<Highcharts.Options>()
    const factBase = useFactBaseUnsecured()
    const { cells } = result
    const historicalValue = item?.historicalValue;
    const factIds = (historicalValue?.factId ? [historicalValue.factId] : historicalValue?.factIds) ?? []

    async function refresh() {
        const { data: factTimeSeries } = await factBase.getAnnualTimeSeries1(factIds)

        const futureData = cells
            .filter(cell => cell.item.name === item.name && cell.period !== 0)
            .map(cell => {
                return {
                    x: year(cell.period),
                    y: cell.value,
                }
            })

        const pastData = factTimeSeries.map(fact => {
            return {
                x: new Date(fact.documentPeriodEndDate).getFullYear(),
                y: fact.value,
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
                { data: pastData, name: 'Past', },
                { data: futureData, name: 'Projected', }
            ] as any
        }
        setOptions(options)
    }

    useEffect(() => {
        refresh()
    }, [])

    return (
        <div className="">
            <p className="mb-8">
                History and Projection for {item.description ?? item.name}
            </p>
            <HighchartsReact highcharts={highcharts} options={options} />
        </div>
    )
}