import React, { useState, useEffect } from "react";
import { StockAnalysis } from "../../../client"
import { highcharts, lime500, lime700, red500, rose300, rose500 } from "../../../highcharts";

import HighchartsReact from "highcharts-react-official";
import { simpleNumber } from "../../../simple-number";

interface Props {
    result: StockAnalysis
}

export function ProfitWaterFall(props: Props) {
    const { result: { businessWaterfall } } = props;

    const [options, setOptions] = useState<Highcharts.Options>()
    const [period, setPeriod] = useState<number>(0)

    function updateChart(period: number) {
        const cells = businessWaterfall[period]

        const revenue = {
            name: cells.revenue.item?.description ?? cells.revenue.item?.name,
            y: cells.revenue.value,
            color: lime700,
        }

        const topExpenses = cells.topExpenses.map(({ item, value }) => {
            return {
                name: item.description ?? item.name,
                y: -value,
                color: red500,
            }
        })

        const profit = {
            name: cells.profit.item?.description ?? cells.profit.item?.name,
            y: cells.profit.value,
            color: cells.profit.value > 0 ? lime700 : rose500,
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

    return <>
        <p>How did AAL make and spend it's money in the most recent year. You can click different years to see analyst projections</p>
        <HighchartsReact highcharts={highcharts} options={options} />
        <div className="flex space-x-1 text-sm">
            {Object.keys(businessWaterfall).map(currentPeriod => {
                const currPeriod = parseInt(currentPeriod)
                return <Pill active={currPeriod === period} period={currPeriod} onClick={() => updatePeriod(currPeriod)} />
            })}
        </div>
    </>
}

function Pill(props: { period: number, active: boolean, onClick: () => void }) {
    const { active, onClick, period } = props;
    return (
        <button
            className={`focus:outline-none ${active ? 'bg-blueGray-500' : 'hover:bg-blueGray-500 border-blueGray-700'} rounded-full border px-4 py-1 shadow-md`}
            onClick={onClick}
        >
            {new Date().getFullYear() + period}
        </button>
    )
}