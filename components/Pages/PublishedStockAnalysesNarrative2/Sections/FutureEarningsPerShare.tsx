import HighchartsReact from "highcharts-react-official";
import React, {useEffect, useState} from "react";
import {StockAnalysis2} from "../../../../client";
import {highcharts, lime500, rose500} from "../../../../highcharts";
import {simpleMoney, simpleNumber} from "../../../../simple-number";
import {year} from "../../../../year";
import {SubTitle} from "../../../Common/Title";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function FutureEarningsPerShare(props: Props) {
    const {
        stockAnalysis: {
            model: {
                epsConceptName,
                sharesOutstandingConceptName,
                netIncomeConceptName,
            },
            cells,
        }
    } = props;
    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        const eps = cells
            .filter(cell => cell.item.name === epsConceptName)
            .map(cell => {
                const {value, period} = cell
                return {
                    x: year(period),
                    y: value,
                    color: value < 0 ? rose500 : lime500,
                }
            })
        const options: Highcharts.Options = {
            chart: {
                type: 'column',
                height: 250,
            },
            legend: {enabled: false},
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
        <div id="future-earnings-per-share">
            <SubTitle className="mb-6">Future Earnings per Share</SubTitle>
            <p>
                To compute a target price, we calculate future earnings per share.
                Let's take projected <b>net income from above</b>. For each future period, divide net income by shares
                outstanding
            </p>
            <br/>
            <table className="w-full">
                <thead>
                <tr>
                    <th/>
                    <th className="text-right px-2">Net Income</th>
                    <th/>
                    <th className="text-right px-2"># Shares</th>
                    <th/>
                    <th className="text-right px-2">EPS</th>
                </tr>
                </thead>
                <tbody>
                {range(0, props.stockAnalysis.model.periods).map(period => {
                    const netIncomeLoss = cells.find(cell => cell.period == period && cell.item?.name === netIncomeConceptName)?.value
                    const sharesOutstanding = cells.find(cell => cell.period == period && cell.item?.name === sharesOutstandingConceptName)?.value
                    const eps = cells.find(cell => cell.period == period && cell.item?.name === epsConceptName)?.value
                    return (
                        <tr key={period}>
                            <td className="font-light text-left text-blueGray-300 px-2 py-1">{year(period)}</td>
                            <td className="text-right px-2 py-1">{simpleMoney(netIncomeLoss)}</td>
                            <td className="text-right px-2 py-1"><span className="font-semibold text-lg">÷</span></td>
                            <td className="text-right px-2 py-1">{simpleNumber(sharesOutstanding)}</td>
                            <td className="text-right px-2 py-1"><span className="font-semibold text-lg">=</span></td>
                            <td className="text-right px-2 py-1">{simpleMoney(eps)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <br/>
            <HighchartsReact highcharts={highcharts} options={options}/>
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