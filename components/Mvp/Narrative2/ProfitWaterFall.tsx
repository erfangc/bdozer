import React, { useState, useEffect } from "react";
import { ModelResult } from "../../../client"
import { highcharts } from "../../../highcharts";

import HighchartsReact from "highcharts-react-official";
import { simpleNumber } from "../../../simple-number";

interface Props {
    result: ModelResult
}

export function ProfitWaterFall(props: Props) {
    const { result: { revenue, categorizedExpenses, profit } } = props;
    const [options, setOptions] = useState<Highcharts.Options>()

    useEffect(() => {
        setOptions({
            chart: {
                type: 'waterfall',
                inverted: true
            },
            xAxis: {
                type: 'category',
                lineWidth: 0,
            },
            title: {
                text: null
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                data: [{
                    name: 'Revenue',
                    y: revenue?.historicalValue?.value,
                    color: '#84CC16',
                },
                ...categorizedExpenses
                    .map(({ name, historicalValue, description }) => ({
                        name: description ?? name,
                        y: -historicalValue?.value,
                        color: '#DC2626',
                    })
                    ),
                {
                    name: 'Profit',
                    y: profit.historicalValue?.value,
                    color: profit.historicalValue?.value < 0 ? '#EF4444' : '#22C55E'
                }],
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return simpleNumber(this.y);
                    },
                },
                pointPadding: 0
            }] as any
        })
    }, [])

    return <HighchartsReact highcharts={highcharts} options={options} />
}
