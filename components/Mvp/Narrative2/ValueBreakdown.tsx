import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ModelResult } from "../../../client";
import { blue600, highcharts, indigo700, lime700 } from "../../../highcharts";
import { Popover } from "../Narrative1/Narrative";

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
             the current stock price must be earned through growing (or recovering) earnings than
            keeping existing level of earning
            <Popover trigger="How is this computed?">
                <h2 className="font-bold">Step 1</h2>
                Share value <em>assuming no growth</em> is computed by assuming
                <ul className="mt-2 list-disc px-8">
                    <li>No revenue growth</li>
                    <li>Expenses to run the business remains the same</li>
                    <li>Taking out one time expenses and benefits</li>
                </ul>
                <h2 className="font-bold mt-12">Step 2</h2>
                Implied value from future growth is computed as the difference between the current exchange
                price of the stock minus the share value assuming no growth
            </Popover>
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
                            return `<span class="text-xs text-left">
                            ${this.series.name}<br> $${this.y.toFixed(2)} / Share
                            </span>`
                        },
                        useHTML: true,
                    },
                },
            },
            series: [
                {
                    name: 'Value from Growth',
                    data: [impliedPriceFromGrowth],
                    color: indigo700,
                    stack: '1',
                },
                {
                    name: 'Value from Current Operations',
                    data: [zeroGrowthPrice],
                    color: lime700,
                    stack: '1',
                },
            ] as any
        })
    }, [])

    return <HighchartsReact highcharts={highcharts} options={options} />
}