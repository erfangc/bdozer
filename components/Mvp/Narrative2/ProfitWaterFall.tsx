import React, { useState, useEffect } from "react";
import { ModelResult } from "../../../client"
import { highcharts } from "../../../highcharts";

import HighchartsReact from "highcharts-react-official";

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
                type: 'category'
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: 'USD'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>${point.y:,.2f}</b> USD'
            },
            series: [{
                data: [{
                    name: 'Revenue',
                    y: revenue?.historicalValue?.value,
                    color: '#84CC16',
                },
                ...categorizedExpenses.map(({ name, historicalValue, description }) => ({ name: description ?? name, y: -historicalValue?.value, color: '#F43F5E' })),
                {
                    name: 'Profit',
                    y: profit.historicalValue?.value,
                    color: profit.historicalValue?.value < 0 ? '#22C55E' : '#EF4444'
                }],
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return highcharts.numberFormat(this.y, 1, '.');
                    },
                    style: {
                        fontWeight: 'bold'
                    }
                },
                pointPadding: 0
            }] as any
        })
    }, [])

    return <HighchartsReact highcharts={highcharts} options={options} />
}