import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { StockAnalysis } from "../../../client";
import { EarningsPerShareBasic } from "../../../constants/ReservedItemNames";
import { green500, highcharts, rose500 } from "../../../highcharts";

interface Props {
    result: StockAnalysis
}

export function FutureEarningsPerShare(props: Props) {
    const { result: { cells } } = props;
    const [options, setOptions] = useState<Highcharts.Options>()
    useEffect(() => {
        const eps = cells
            .filter(cell => cell.item.name === EarningsPerShareBasic)
            .map(cell => {
                const { value, period } = cell
                return {
                    x: new Date().getFullYear() + period,
                    y: value,
                    color: value < 0 ? rose500 : green500,
                }
            })
        const options: Highcharts.Options = {
            chart: {
                type: 'column'
            },
            legend: { enabled: false },
            title: {
                text: null
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return `$${this.value}`
                    }
                }
            },
            xAxis: {
                lineWidth: 0,
                type: 'category'
            },
            plotOptions: {
                column: {
                    pointPadding: 0
                }
            },
            series: [{
                name: 'Projected Earnings per Share',
                data: eps,
            }] as any
        }
        setOptions(options)
    }, [])
    return (
        <>
            <p>Based on the above projections. What are the earnings per share going forward?</p>
            <br />
            <HighchartsReact highcharts={highcharts} options={options} />
        </>
    )
}