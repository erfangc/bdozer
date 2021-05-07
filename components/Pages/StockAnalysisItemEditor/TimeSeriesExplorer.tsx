import React, {useEffect, useState} from 'react'
import {Item, StockAnalysis2} from "../../../client";
import {useTimeSeries} from "../../../api-hooks";
import {simpleNumber} from "../../../simple-number";
import {highcharts} from "../../../highcharts";
import HighchartsReact from "highcharts-react-official";
import {Loading} from "../../Common/Svgs";

interface Props {
    stockAnalysis: StockAnalysis2
    item: Item
}

export function TimeSeriesExplorer({stockAnalysis, item}: Props) {

    const {model} = stockAnalysis;
    const {cik, totalRevenueConceptName} = model;
    const {historicalValue} = item;
    const factId = historicalValue?.factId;
    const timeSeriesApi = useTimeSeries()
    const [options, setOptions] = useState<Highcharts.Options>()
    const [loading, setLoading] = useState(true)

    async function init() {
        if (factId) {
            setLoading(true);
            const {data: factTimeSeries} = await timeSeriesApi.getTimeSeriesForFact(
                cik,
                factId,
                [totalRevenueConceptName],
                undefined,
                undefined,
                undefined,
                // prune
                true,
            );

            const series = factTimeSeries.map(fts => {
                const data = fts.facts.map(fact => ({
                    x: new Date(fact.documentPeriodEndDate).getFullYear(),
                    y: fact.doubleValue,
                }))
                return {
                    name: fts.label,
                    data,
                }
            });

            const options: Highcharts.Options = {
                chart: {
                    type: 'column',
                    height: 256,
                },
                title: {text: null,},
                xAxis: {
                    type: 'category',
                },
                yAxis: {
                    title: {text: null,},
                    labels: {
                        formatter: function () {
                            return `${simpleNumber(this.value)}`
                        }
                    }
                },
                series: series as any
            };
            setOptions(options);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <div>
            {
                loading
                    ?
                    <div className="h-64 flex items-center justify-center">
                        <Loading/><span>Loading ...</span>
                    </div>
                    : <HighchartsReact highcharts={highcharts} options={options}/>
            }
        </div>
    )
}