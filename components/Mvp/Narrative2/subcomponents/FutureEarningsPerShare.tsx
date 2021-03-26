import HighchartsReact from "highcharts-react-official";
import React from "react";
import { useEffect, useState } from "react";
import { StockAnalysis } from "../../../../client";
import { EarningsPerShareBasic, NetIncomeLoss, WeightedAverageNumberOfSharesOutstandingBasic } from "../../../../constants/ReservedItemNames";
import { green500, highcharts, rose500 } from "../../../../highcharts";
import { simpleNumber } from "../../../../simple-number";
import { SubTitle } from "../../../Title";

interface Props {
    result: StockAnalysis
}

export function FutureEarningsPerShare(props: Props) {
    const { result: { cells } } = props;
    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        const eps = cells
            .filter(cell => cell.item.name === EarningsPerShareBasic)
            .map(cell => {
                const { value, period } = cell
                return {
                    x: new Date().getFullYear() + period,
                    y: value,
                    color: value < 0 ? rose500 : green500,
                }
            })
        const options: Highcharts.Options = {
            chart: {
                type: 'column'
            },
            legend: { enabled: false },
            title: {
                text: null
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return `$${this.value}`
                    }
                }
            },
            xAxis: {
                lineWidth: 0,
                type: 'category'
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointPadding: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return `<span class="text-blueGray-50">$${this.y.toFixed(1)} / share</span>`
                        },
                        useHTML: true
                    }
                }
            },
            series: [{
                name: 'Projected Earnings per Share',
                data: eps,
            }] as any
        }
        setOptions(options)
    }, [])

    return (
        <div className="future-earnings-per-share">
            <SubTitle className="mb-6">Future Earnings per Share</SubTitle>
            <p>
                To compute a target price, we calculate future earnings per share.
                Let's take projected <b>net income from above</b> for each future period and divide it by shares outstanding
            </p>
            <br />
            <table className="w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th className="text-right px-2">Net Income</th>
                        <th></th>
                        <th className="text-right px-2"># Shares</th>
                        <th></th>
                        <th className="text-right px-2">EPS</th>
                    </tr>
                </thead>
                <tbody>
                    {range(0, props.result.model.periods).map(period => {
                        const netIncomeLoss = cells.find(cell => cell.period == period && cell.item?.name === NetIncomeLoss)?.value
                        const sharesOutstanding = cells.find(cell => cell.period == period && cell.item?.name === WeightedAverageNumberOfSharesOutstandingBasic)?.value
                        const eps = cells.find(cell => cell.period == period && cell.item?.name === EarningsPerShareBasic)?.value
                        return (
                            <tr>
                                <td className="font-light text-left text-blueGray-300 px-2 py-1">{new Date().getFullYear() + period}</td>
                                <td className="text-right px-2 py-1">{simpleNumber(netIncomeLoss.toFixed(0))}</td>
                                <td className="text-right px-2 py-1"><span className="font-semibold text-lg">÷</span></td>
                                <td className="text-right px-2 py-1">{simpleNumber(sharesOutstanding.toFixed(0))}</td>
                                <td className="text-right px-2 py-1"><span className="font-semibold text-lg">=</span></td>
                                <td className="text-right px-2 py-1">${eps.toFixed(1)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <HighchartsReact highcharts={highcharts} options={options} />
        </div>
    )
}

function range(start: number, end: number) {
    let ret = []
    for (let i = start; i <= end; i++) {
        ret.push(i)
    }
    return ret
}