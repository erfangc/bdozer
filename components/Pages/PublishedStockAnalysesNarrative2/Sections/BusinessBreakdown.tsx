import HighchartsReact from "highcharts-react-official";
import React, {useEffect, useState} from "react";
import {Item, StockAnalysis2} from "../../../../client";
import {blueGray900, highcharts, lime500, rose500} from "../../../../highcharts";
import {simpleNumber} from "../../../../simple-number";
import {year} from "../../../../year";
import {SubTitle} from "../../../Common/Title";
import {Pill} from "../Pill";
import {BlockQuote} from "../../../Common/BlockQuote";


interface Props {
    stockAnalysis: StockAnalysis2
}

export function BusinessBreakdown(props: Props) {
    const { stockAnalysis: { name, derivedStockAnalytics: { businessWaterfall } } } = props;

    const [options, setOptions] = useState<Highcharts.Options>()
    const [period, setPeriod] = useState<number>(0)

    function updateChart(period: number) {

        const waterfall = businessWaterfall[period]

        const revenue = {
            name: waterfall.revenue.item?.description ?? waterfall.revenue.item?.name,
            y: waterfall.revenue.value,
            color: lime500,
            item: waterfall.revenue.item,
        }

        const topExpenses = waterfall.expenses.map(({ item, value }) => {
            const valueT = -value
            return {
                name: item.description ?? item.name,
                y: valueT,
                color: valueT > 0 ? lime500 : rose500,
                item: item,
            }
        })

        const profit = {
            name: waterfall.profit.item?.description ?? waterfall.profit.item?.name,
            y: waterfall.profit.value,
            color: blueGray900,
            borderColor: waterfall.profit.value > 0 ? lime500 : rose500,
            borderWidth: 1,
            isSum: true,
        }

        setOptions({
            chart: {
                type: 'waterfall', inverted: true
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    const item = (this.point.options as any).item as Item
                    const commentary = item?.commentaries?.commentary
                    return commentary ? `
                    <div class="px-2 text-blueGray-50 z-10">
                      <span>${commentary}</span>
                    </div>`
                        :
                        `<div class="px-2  text-blueGray-50 z-10">No commentary</div>`;
                },
            },
            xAxis: {
                type: 'category', lineWidth: 0,
            },
            title: { text: null },
            yAxis: {
                title: { text: null },
                labels: { enabled: false }
            },
            legend: { enabled: false },
            series: [{
                data: [
                    revenue,
                    ...topExpenses,
                    profit,
                ],
                dataLabels: {
                    enabled: true,
                    useHTML: false,
                    formatter: function () {
                        return `<div class="z-0">${simpleNumber(this.y.toFixed(0))}</div>`;
                    },
                    zIndex: 0,
                },
                pointPadding: 0
            }] as any
        })
    }

    useEffect(() => {
        updateChart(period)
    }, [])

    function updatePeriod(period) {
        setPeriod(period)
        updateChart(period)
    }

    return (
        <section id="business-breakdown">
            <SubTitle className="mb-6">Business Breakdown</SubTitle>
            <p>See how {name} make and spend it's money</p>
            <BlockQuote>Click on different years to see projections</BlockQuote>
            <HighchartsReact highcharts={highcharts} options={options} />
            <div className="flex space-x-1 text-sm">
                {Object
                    .keys(businessWaterfall)
                    .map(currentPeriod => {
                        const currPeriod = parseInt(currentPeriod)
                        return (
                            <Pill
                                key={currentPeriod}
                                active={currPeriod === period}
                                label={year(currPeriod).toString()}
                                onClick={() => updatePeriod(currPeriod)}
                            />
                        )
                })}
            </div>
        </section>
    )
}