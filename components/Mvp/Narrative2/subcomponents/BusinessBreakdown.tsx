import React, { useState, useEffect } from "react";

import HighchartsReact from "highcharts-react-official";
import { StockAnalysis } from "../../../../client";
import { lime700, rose500, highcharts } from "../../../../highcharts";
import { simpleNumber } from "../../../../simple-number";
import { SubTitle } from "../../../Title";
import { Pill } from "../Pill";

interface Props {
    result: StockAnalysis
}

export function BusinessBreakdown(props: Props) {
    const { result: { businessWaterfall } } = props;

    const [options, setOptions] = useState<Highcharts.Options>()
    const [period, setPeriod] = useState<number>(0)

    function updateChart(period: number) {
        const waterfall = businessWaterfall[period]

        const revenue = {
            name: waterfall.revenue.item?.description ?? waterfall.revenue.item?.name,
            y: waterfall.revenue.value,
            color: lime700,
        }

        const topExpenses = waterfall.topExpenses.map(({ item, value }) => {
            return {
                name: item.description ?? item.name,
                y: value,
                color: value > 0 ? lime700 : rose500,
            }
        })

        const profit = {
            name: waterfall.profit.item?.description ?? waterfall.profit.item?.name,
            y: waterfall.profit.value,
            color: waterfall.profit.value > 0 ? lime700 : rose500,
            isSum: true,
        }

        setOptions({
            chart: {
                type: 'waterfall', inverted: true
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
                    formatter: function () {
                        return simpleNumber(this.y.toFixed(0));
                    },
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
        <div id="business-breakdown">
            <SubTitle className="mb-6">Business Breakdown</SubTitle>
            <p>How did AAL make and spend it's money in the most recent year. You can click different years to see analyst projections</p>
            <HighchartsReact highcharts={highcharts} options={options} />
            <div className="flex space-x-1 text-sm">
                {Object.keys(businessWaterfall).map(currentPeriod => {
                    const currPeriod = parseInt(currentPeriod)
                    const year = new Date().getFullYear() + currPeriod
                    return <Pill active={currPeriod === period} label={year.toString()} onClick={() => updatePeriod(currPeriod)} />
                })}
            </div>
        </div>
    )
}