import React from 'react';
import {StockAnalysis2} from "../../../../client";
import HighchartsReact from "highcharts-react-official";
import {highcharts, theme} from "../../../../highcharts";
import {year} from "../../../../year";
import {readableMoney, readableNumber} from "../../../../number-formatters";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function FutureGrowthPerShare(props: Props) {

    const {
        stockAnalysis: {
            model: {
                periods,
                epsConceptName,
                netIncomeConceptName,
                sharesOutstandingConceptName,
            },
            cells,
        }
    } = props;

    const finalNetIncome = cells
        .find(cell => cell.item.name == netIncomeConceptName && cell.period == periods)
        ?.value

    const eps = cells
        .filter(cell => cell.item.name === epsConceptName)
        .map(cell => {
            const {value, period} = cell
            return {
                x: year(period),
                y: value,
                color: value < 0 ? theme.colors.red["100"] : theme.colors.lime["100"],
            }
        });

    const options: Highcharts.Options = {
        chart: {
            type: 'line',
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
                },
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
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return `<span class="text-blueGray-50">$${this.y.toFixed(1)}/Share</span>`
                    },
                    style: {
                        color: theme.colors.gray["2"]
                    },
                    useHTML: true
                }
            }
        },
        series: [{
            name: 'Projected Earnings per Share',
            data: eps,
            color: theme.colors.lime["100"]
        }] as any
    };

    return (
        <section className="bg-navy-100 p-6 rounded-lg w-card" id="future-growth-per-share">
            <h3 className="heading3 mb-10">Future Growth per Share</h3>
            <HighchartsReact highcharts={highcharts} options={options}/>
            <h5 className="heading5 mt-8 mb-4 pb-2 border-b">Our Calculations</h5>
            <p className="paragraph-regular">
                To compute a target price, we calculate future earnings per share (EPS).
                Let's take projected net income from above ({readableNumber(finalNetIncome)})
                and for each future period, divide net income by shares outstanding
            </p>
            <br/>
            <div className="px-6 py-4 bg-deepNavy-100">
                <table className="w-full">
                    <thead>
                    <tr className="label-regular border-b">
                        <th className="text-left pb-4 w-24 px-2">Year</th>
                        <th className="text-left pb-4 px-2">Net Income</th>
                        <th/>
                        <th className="text-left pb-4 px-2">Number of Shares</th>
                        <th/>
                        <th className="text-left pb-4 px-2">EPS</th>
                    </tr>
                    </thead>
                    <tbody className="font-mono numbers-regular">
                    {range(0, props.stockAnalysis.model.periods).map(period => {
                        const netIncomeLoss = cells.find(cell => cell.period == period && cell.item?.name === netIncomeConceptName)?.value
                        const sharesOutstanding = cells.find(cell => cell.period == period && cell.item?.name === sharesOutstandingConceptName)?.value
                        const eps = cells.find(cell => cell.period == period && cell.item?.name === epsConceptName)?.value
                        return (
                            <tr key={period}>
                                <td className="font-light text-left text-blueGray-300 px-2 py-2">{year(period)}</td>
                                <td className="text-left px-2 py-2">{readableMoney(netIncomeLoss)}</td>
                                <td className="text-left px-2"><span className="font-semibold text-lg">÷</span></td>
                                <td className="text-left px-2">{readableNumber(sharesOutstanding)}</td>
                                <td className="text-left px-2"><span className="font-semibold text-lg">=</span></td>
                                <td className="text-left text-lime-100 px-2">{readableMoney(eps)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


function range(start: number, end: number) {
    let ret = []
    for (let i = start; i <= end; i++) {
        ret.push(i)
    }
    return ret
}