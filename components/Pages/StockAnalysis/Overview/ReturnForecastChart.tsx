import {tvps} from "../tvps";
import {highcharts, theme} from "../../../../highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import {StockAnalysis2} from "../../../../client";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function ReturnForecastChart({stockAnalysis}: Props) {

    const {
        model: {
            periods,
        },
    } = stockAnalysis;


    const {
        derivedStockAnalytics: {
            currentPrice,
        },
    } = stockAnalysis;
    const finalPrice = tvps(stockAnalysis);

    const options: Highcharts.Options = {
        yAxis: {
            title: {text: null},
        },
        xAxis: {
            categories: ['Purchase Price', `In ${periods} years`],
            type: "category",
        },
        series: [
            {
                name: 'Sale Price',
                color: theme.colors.lime["100"],
                data: [{name: 'Pay today', y: currentPrice, color: theme.colors.chili['50']}, {
                    name: 'Get in 5 years',
                    y: finalPrice
                }],
                stacking: "normal",
                type: 'column',
            },
            {
                name: 'Dividends',
                data: [{y: 0}, {y: 0}],
                color: theme.colors.lime["25"],
                stacking: "normal",
                type: 'column',
            },
        ]
    }

    return (
        <HighchartsReact
            highcharts={highcharts}
            options={options}
        />
    )

}