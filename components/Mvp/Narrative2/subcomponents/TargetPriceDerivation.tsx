import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { StockAnalysis } from "../../../../client";
import { PresentValuePerShare, EarningsPerShareDiluted, DiscountFactor } from "../../../../constants/ReservedItemNames";
import { highcharts } from "../../../../highcharts";
import { Label } from "../../../Title";
import { Percent, Number } from "../Card";

interface Props {
    result: StockAnalysis
}
export function TargetPriceDerivation(props: Props) {
    const { result: { cells, model, discountRate, targetPrice } } = props
    const { beta, terminalFcfGrowthRate } = model
    const pvs = cells
        .filter(cell => cell.item.name === PresentValuePerShare)
        .map(
            cell => {
                const period = new Date().getFullYear() + cell.period
                const from = period.toString();
                return [from, `Target Price $${targetPrice.toFixed(1)} / share`, cell.value]
            }
        )

    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        const options: Highcharts.Options = {
            chart: {
                inverted: true
            },
            tooltip: {
                enabled: false
            },
            title: {
                text: null,
            },
            plotOptions: {
                sankey: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            const options = this.point.options
                            return `<p>$${options.weight.toFixed(1)}<br/></p>`
                        },
                    }
                }
            },
            series: [{
                keys: ['from', 'to', 'weight'],
                data: pvs,
                type: 'sankey',
            }] as any
        }
        setOptions(options)
    }, [])

    const finalEps = cells.find(cell => cell.item?.name === EarningsPerShareDiluted && cell.period == model.periods)?.value
    const terminalValuePerShare = cells.find(cell => cell.item?.name === PresentValuePerShare && cell.period == model.periods)?.value
    const terminalDiscountFactor = cells.find(cell => cell.item?.name === DiscountFactor && cell.period == model.periods)?.value
    return <>
        <p>How do the EPS from future years contribute to the target price of ${targetPrice.toFixed(1)}?</p>
        <HighchartsReact highcharts={highcharts} options={options} />
        <Label>Assumptions</Label>
        <div className="mt-4 grid grid-cols-2 gap-2">
            <Percent title="Discount Rate" value={discountRate} />
            <Number title="Beta" value={beta} />
        </div>
        {/* Breakdown terminal value calculation */}
        <Label className="mt-8 mb-4">Terminal Value Calculation</Label>
        <div className="flex flex-col text-blueGray-300">
            <div className="flex justify-between">
                <b>Discount Rate</b>
                <span className="font-light">{(discountRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
                <b>Long-term Earnings Growth Rate</b>
                <span className="font-light"> {(terminalFcfGrowthRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
                <b className="">Terminal Multiple <code className="block text-xs font-normal mt-2 mb-4">1 / (Discount Rate - Longterm Growth)</code></b>
                <span className="font-light">{(1 / (discountRate - terminalFcfGrowthRate)).toFixed(1)} x</span>
            </div>
            <div className="flex justify-between">
                <b className="">Final Year EPS</b>
                <span className="font-light">${finalEps.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
                <b className="">Discount Factor</b>
                <span className="font-light">{terminalDiscountFactor.toFixed(1)}</span>
            </div>
            <div className="flex justify-between mt-2">
                <b className="pt-2">Terminal Value</b>
                <span className="border-t pt-2 font-bold ">${terminalValuePerShare.toFixed(1)}</span>
            </div>
        </div>
    </>
}