import React from "react";
import {StockAnalysis2} from "../../../../client";
import {commafy} from "../../../../number-formatters";
import HighchartsReact from "highcharts-react-official";
import {highcharts, theme} from '../../../../highcharts';
import {tvps} from "../tvps";
import {Statistic} from "./Statistic";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function ReturnForecast({stockAnalysis}: Props) {

    const {
        derivedStockAnalytics: {
            currentPrice,
        },
        model,
    } = stockAnalysis;

    const periods = model.periods
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
                data: [{y: 0}, {y: 20}],
                color: theme.colors.lime["25"],
                stacking: "normal",
                type: 'column',
            },
        ]
    }

    return (
        <section className="bg-navy-100 p-6 space-y-6 rounded-lg w-mobileCard lg:w-card" id="return-forecast">
            <h3 className="heading3">Return Forecast</h3>
            <Statistic stockAnalysis={stockAnalysis}/>
            <p className="paragraph-regular">
                In {periods} years, you could earn an estimated
                ${commafy(finalPrice - currentPrice)} on a
                single stock purchased at ${commafy(currentPrice)}.
            </p>
            <HighchartsReact
                highcharts={highcharts}
                options={options}
            />
        </section>
    )
}
