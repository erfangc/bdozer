import React from 'react';
import {StockAnalysis2} from "../../../../client";
import HighchartsReact from "highcharts-react-official";
import {highcharts, theme} from "../../../../highcharts";
import {year} from "../../../../year";
import {readableNumber} from "../../../../number-formatters";
import {EpsTable} from "./EpsTable";

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
        <section className="bg-navy-100 space-y-6 p-6 rounded-lg w-mobileCard lg:w-card" id="future-growth-per-share">
            <h3 className="heading3">Future Growth per Share</h3>
            <HighchartsReact highcharts={highcharts} options={options}/>
            <h5 className="heading5 pb-2 border-b">Our Calculations</h5>
            <p className="paragraph-regular">
                To compute our price forecast in {year(periods)}, we calculate future earnings per share (EPS).
                Let's take projected net income from above ({readableNumber(finalNetIncome)})
                and for each future period, divide net income by shares outstanding
            </p>
            <EpsTable stockAnalysis={props.stockAnalysis}/>
        </section>
    );
}

