import HighchartsReact from "highcharts-react-official";
import React from "react";
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
            currentPrice,
        }
    } = props;

    return <div className="my-12">
        <SubTitle className="mb-4">Value Breakdown</SubTitle>
        {
            zeroGrowthPrice <= 0
                ?
                <p className="text-base">
                    The net income for this stock is currently negative.
                The entire value of <span className="font-bold text-blue-400">${currentPrice}</span> per share comes from expectation of future growth
                or recovery of profits
                </p>
                : <ValueBreakdownPieChart {...props} />
        }
    </div>
}

function ValueBreakdownPieChart(props: Props) {
    const {
        result: {
            zeroGrowthPrice,
            impliedPriceFromGrowth,
        }
    } = props;

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            plotBorderWidth: null,
            plotBackgroundColor: null,
            plotShadow: false,
        },
        title: { text: null },
        yAxis: { title: { text: null } },
        xAxis: { grid: { enabled: false } },
        series: [
            {
                colorByPoint: true,
                data: [
                    { name: 'Zero Growth Value / share', y: zeroGrowthPrice },
                    { name: 'Implied Value from Growth', y: impliedPriceFromGrowth },
                ]
            },
        ] as any
    }
    return <HighchartsReact highcharts={highcharts} options={options} />
}