import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { StockAnalysis } from "../../../../client";
import { PresentValueOfEarningsPerShare, PresentValueOfTerminalValuePerShare, EarningsPerShareBasic, TerminalValuePerShare } from "../../../../constants";
import { blueGray200, indigo600, indigo400, amber600, amber400, highcharts } from "../../../../highcharts";
import { year } from "../../../../year";
import { Popover } from "../../../Popover";
import { SubTitle } from "../../../Common/Title";
import { DiscountFactorDerivation } from "./DiscountFactorDerivation";

interface Props {
    result: StockAnalysis
}
export function TargetPriceDerivation(props: Props) {
    const {
        result: { model, cells, discountRate, targetPrice }
    } = props

    const to = `Target Price $${targetPrice.toFixed(1)} / share`
    const sandkeys = cells
        .filter(cell => cell.item.name === PresentValueOfEarningsPerShare)
        .map(
            cell => {
                const period = year(cell.period)
                const from = period.toString();
                return [from, to, cell.value]
            }
        )
    const pvTvps = cells.find(cell => cell.item.name === PresentValueOfTerminalValuePerShare && cell.period === model.periods)?.value
    sandkeys.push(['Terminal Value', to, pvTvps])

    const [sankeyOptions, setSandkeyOptions] = useState<Highcharts.Options>()
    const [columnOptions, setColumnOptions] = useState<Highcharts.Options>()

    function itemToSeriesData(itemName: string) {
        return cells
            .filter(cell => cell.period !== 0 && cell.item.name === itemName)
            .map(cell => {
                const period = new Date().getFullYear() + cell.period
                return {
                    name: period,
                    y: cell.value
                }
            })
    }

    const pvOfEps = itemToSeriesData(PresentValueOfEarningsPerShare)
    const pvOfTvps = itemToSeriesData(PresentValueOfTerminalValuePerShare)
    const eps = itemToSeriesData(EarningsPerShareBasic)
    const tvps = itemToSeriesData(TerminalValuePerShare)

    useEffect(() => {
        const options: Highcharts.Options = {
            chart: { inverted: true },
            tooltip: { enabled: false },
            title: { text: null, },
            plotOptions: {
                sankey: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () { return `<p>$${this.point.options.weight.toFixed(1)}<br/></p>` },
                    }
                }
            },
            series: [{
                keys: ['from', 'to', 'weight'],
                data: sandkeys,
                type: 'sankey',
            }] as any
        }
        setSandkeyOptions(options)
    }, [])

    useEffect(() => {
        const options2: Highcharts.Options = {
            chart: {
                type: 'column'
            },
            title: { text: null, },
            xAxis: { type: 'category', lineWidth: 0, },
            yAxis: {
                title: { text: '$ / Share', style: { color: blueGray200 } }
            },
            plotOptions: {
                column: { stacking: 'normal' }
            },
            series: [
                {
                    name: 'Earnings per Share',
                    data: eps,
                    color: indigo600,
                    stack: 'Undiscounted',
                },
                {
                    name: 'Discounted Earnings per Share',
                    data: pvOfEps,
                    color: indigo400,
                    stack: 'Discounted',
                },
                {
                    name: 'Terminal Value per Share',
                    data: tvps,
                    color: amber600,
                    stack: 'Undiscounted',
                },
                {
                    name: 'Discounted Terminal Value per Share',
                    data: pvOfTvps,
                    color: amber400,
                    stack: 'Discounted',
                },
            ] as any
        }
        setColumnOptions(options2)
    }, [])

    return (
        <div id="target-price-derivation">
            <SubTitle className="mb-6">Target Price Derivation</SubTitle>
            <p>
                To derive the target price of ${targetPrice.toFixed(1)}, we will discount future earnings into
                the present at a discount rate of <Popover trigger={`${(discountRate * 100).toFixed(1)}%`}>
                    <DiscountFactorDerivation {...props} />
                </Popover>
            </p>
            <HighchartsReact highcharts={highcharts} options={sankeyOptions} />
        </div>
    )
}