import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { StockAnalysis } from "../../../../client";
import { blue700, green800, highcharts } from "../../../../highcharts";
import { SubTitle } from "../../../Title";
import { Popover } from "../../Narrative1/Narrative";

interface Props {
    result: StockAnalysis
}

export function TargetPriceBreakdown(props: Props) {
    const {
        result: { zeroGrowthPrice, targetPrice, }
    } = props;
    const impliedPriceFromGrowth = targetPrice - zeroGrowthPrice
    const text = zeroGrowthPrice <= 0
        ?
        <p>
            The net income for this stock is currently negative.
                The entire value of <span className="font-bold text-blue-400">${targetPrice.toFixed(2)}</span> per share
                comes from expectation of future growth or recovery of profits
        </p>
        :
        <p>
            About <NumberFormat className="font-extrabold text-lg text-blue-400" value={(impliedPriceFromGrowth / targetPrice) * 100} decimalScale={1} displayType="text" suffix="%" /> of
             the target stock price must be earned through growing (or recovering) earnings than
            keeping existing level of earning
            <br />
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
        <div id="target-price-breakdown">
            <SubTitle className="mb-6">Target Price Breakdown</SubTitle>
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
    const { result: { zeroGrowthPrice, targetPrice, } } = props;

    const impliedPriceFromGrowth = targetPrice - zeroGrowthPrice

    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        setOptions({
            chart: {
                type: 'column',
                inverted: true,
            },
            title: { text: null },
            yAxis: {
                title: { text: null },
                labels: { enabled: false }
            },
            xAxis: {
                type: 'category',
                labels: {
                    enabled: false,
                },
                lineWidth: 0,
            },
            legend: {
                enabled: true,
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return (
                                `<span class="text-sm text-left">
                                    $${this.y.toFixed(2)} / Share
                                </span>
                                `
                            )
                        },
                    },
                },
            },
            series: [
                {
                    name: 'Value from Growth',
                    data: [impliedPriceFromGrowth],
                    color: blue700,
                    stack: '1',
                },
                {
                    name: 'Value from Current Operations',
                    data: [zeroGrowthPrice],
                    color: green800,
                    stack: '1',
                },
            ] as any
        })
    }, [])

    return <HighchartsReact highcharts={highcharts} options={options} />
}