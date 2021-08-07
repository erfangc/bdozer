import React from "react";
import {StockAnalysis2} from "../../../../client";
import {commafy, readablePercent} from "../../../../number-formatters";
import HighchartsReact from "highcharts-react-official";
import {highcharts, theme} from '../../../../highcharts';

interface Props {
    stockAnalysis: StockAnalysis2
}

export function ReturnForecast({stockAnalysis}: Props) {

    const {
        derivedStockAnalytics: {
            currentPrice,
        },
        model,
        cells,
    } = stockAnalysis;

    const periods = model.periods
    const finalTvps = cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == periods)?.value

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
                    y: finalTvps
                }],
                stacking: "normal",
                type: 'bar',
            },
            {
                name: 'Dividends',
                data: [{y: 0}, {y: 20}],
                color: theme.colors.avocado["75"],
                stacking: "normal",
                type: 'bar',
            },
        ]
    }

    return (
        <section className="bg-navy-100 p-6 rounded-lg w-card" id="return-forecast">
            {/* Row 1 */}
            <h3 className="heading3">Return Forecast</h3>

            {/* Row 2 */}
            <div className="justify-evenly items-center flex pt-10 pb-4">
                <div className="text-lime-100">
                    <span className="label-small">Estimated {periods} Year Returns</span>
                    <h1 className="font-mono numbers-large">{readablePercent(finalTvps / currentPrice - 1)}</h1>
                </div>
                <span className="w-px h-8 border-l"/>
                <div>
                    <span className="label-small">Purchase Price</span>
                    <h1 className="font-mono numbers-medium">
                        ${commafy(currentPrice)}
                    </h1>
                </div>
                <span className="w-px h-8 border-l"/>
                <div>
                    <span className="label-small">Estimated {periods} Year Sale Price</span>
                    <h1 className="font-mono numbers-medium">
                        ${commafy(finalTvps)}
                    </h1>
                </div>
            </div>

            <p className="paragraph-regular my-6">
                In {periods} years,
                you could earn an estimated ${commafy(finalTvps - currentPrice)} on
                a single stock purchased at ${commafy(currentPrice)}.
            </p>

            <HighchartsReact
                highcharts={highcharts}
                options={options}
            />
        </section>
    )
}
