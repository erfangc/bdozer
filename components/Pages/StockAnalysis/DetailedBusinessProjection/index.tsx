import {Item, StockAnalysis2} from "../../../../client";
import React, {useEffect, useState} from "react";
import {highcharts, theme} from "../../../../highcharts";
import {readableNumber} from "../../../../number-formatters";
import HighchartsReact from "highcharts-react-official";
import {year} from "../../../../year";
import {Pill} from "./Pill";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function DetailedBusinessProjection(props: Props) {
    const {stockAnalysis: {name, model, derivedStockAnalytics: {businessWaterfall}}} = props;

    const [options, setOptions] = useState<Highcharts.Options>()
    const [period, setPeriod] = useState<number>(0)

    function updateChart(period: number) {

        const waterfall = businessWaterfall[period]

        const revenue = {
            name: waterfall.revenue.item?.description ?? waterfall.revenue.item?.name,
            y: waterfall.revenue.value,
            color: theme.colors.lime["100"],
            item: waterfall.revenue.item,
        }

        const topExpenses = waterfall.expenses.map(({item, value}) => {
            const valueT = -value
            return {
                name: item.description ?? item.name,
                y: valueT,
                color: valueT > 0 ? theme.colors.lime["100"] : theme.colors.red["100"],
                item: item,
            }
        })

        const profit = {
            name: waterfall.profit.item?.description ?? waterfall.profit.item?.name,
            y: waterfall.profit.value,
            color: 'transparent',
            borderColor: waterfall.profit.value > 0 ? theme.colors.lime["100"] : theme.colors.red["100"],
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
            title: {text: null},
            yAxis: {
                title: {text: null},
                labels: {enabled: false}
            },
            legend: {enabled: false},
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
                        return `<div class="z-0">${readableNumber(this.y.toFixed(0))}</div>`;
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
        <section className="bg-navy-100 p-6 space-y-6 rounded-lg w-mobileCard lg:w-card" id="detailed-business-projection">
            <h3 className="heading3">Detailed Business Projection</h3>
            <p className="paragraph-regular">{name}'s projected revenues, costs, and profit</p>
            <div className="flex space-x-1 my-4 overflow-hidden">
                {Object
                    .keys(businessWaterfall)
                    .map(currentPeriod => {
                        const currPeriod = parseInt(currentPeriod)
                        return (
                            <Pill
                                key={currentPeriod}
                                active={currPeriod === period}
                                label={year(model, currPeriod).toString()}
                                onClick={() => updatePeriod(currPeriod)}
                            />
                        )
                    })}
            </div>
            <HighchartsReact highcharts={highcharts} options={options}/>
        </section>
    )
}


