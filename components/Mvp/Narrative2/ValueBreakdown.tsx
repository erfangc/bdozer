import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ModelResult } from "../../../client";
import { highcharts } from "../../../highcharts";
import { SubTitle } from "../../Title";

interface Props {
    result: ModelResult
}

export function ValueBreakdown(props: Props) {
    const {
        result: {
            zeroGrowthPrice,
            impliedPriceFromGrowth,
            currentPrice,
        }
    } = props;
    const text = zeroGrowthPrice <= 0
        ?
        <p>
            The net income for this stock is currently negative.
                The entire value of <span className="font-bold text-blue-400">${currentPrice}</span> per share
                comes from expectation of future growth or recovery of profits
        </p>
        :
        <p>
            About <NumberFormat className="font-extrabold text-lg text-blue-400" value={(impliedPriceFromGrowth / currentPrice) * 100} decimalScale={1} displayType="text" suffix="%" /> of
             the current stock price must be earned through growing earnings than
            keeping existing level of earning
        </p>
    return (
        <div>
            {text}
            {
                zeroGrowthPrice > 0
                    ?
                    <ValueBreakdownPieChart {...props} />
                    : null
            }
        </div>
    )
}

function ValueBreakdownPieChart(props: Props) {
    const {
        result: {
            zeroGrowthPrice,
            impliedPriceFromGrowth,
        }
    } = props;

    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        setOptions({
            chart: {
                type: 'column'
            },
            title: { text: null },
            yAxis: {
                title: { text: null },
                labels: { enabled: false }
            },
            xAxis: {
                type: 'category',
                labels: {
                    enabled: false
                },
                lineWidth: 0,
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return `<span className="text-lg">${this.series.name}<br> ${this.y.toFixed(2)} / Share</span>`
                        },
                        useHTML: true,
                    },
                },
            },
            series: [
                {
                    name: 'Implied Value from Growth',
                    data: [impliedPriceFromGrowth],
                    stack: '1',
                },
                {
                    name: 'Zero Growth Value',
                    data: [zeroGrowthPrice],
                    stack: '1',
                },
            ] as any
        })
    }, [])

    return <HighchartsReact highcharts={highcharts} options={options} />
}