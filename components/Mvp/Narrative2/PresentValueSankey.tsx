import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { ModelResult } from "../../../client";
import { PresentValuePerShare, TerminalValuePerShare } from "../../../constants/ReservedItemNames";
import { highcharts } from "../../../highcharts";
import { Label } from "../../Title";
import { Number, Percent } from "./Card";

interface Props {
    result: ModelResult
}
export function PresentValueSankey(props: Props) {
    const { result: { cells, model, discountRate, targetPrice } } = props
    const { beta } = model
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

    return <>
        <p>How do the the EPS from future years to the target price of ${targetPrice.toFixed(1)}?</p>
        <HighchartsReact highcharts={highcharts} options={options} />
        <Label>Assumptions</Label>
        <div className="mt-4 grid grid-cols-2 gap-2">
            <Percent title="Discount Rate" value={discountRate} />
            <Number title="Beta" value={beta} />
        </div>
    </>
}