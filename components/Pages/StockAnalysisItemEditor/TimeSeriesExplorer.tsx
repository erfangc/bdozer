import React, {useEffect, useState} from 'react'
import {Item, StockAnalysis2} from "../../../client";
import {useTimeSeries} from "../../../api-hooks";
import {readableNumber} from "../../../number-formatters";
import {blueGray700, highcharts} from "../../../highcharts";
import HighchartsReact from "highcharts-react-official";
import {Loading} from "../../Common/Svgs";
import {Label, SubTitle} from "../../Common/Title";

interface Props {
    stockAnalysis: StockAnalysis2
    item: Item
}

export function TimeSeriesExplorer({stockAnalysis, item}: Props) {

    const {model} = stockAnalysis;
    const {cik, totalRevenueConceptName, netIncomeConceptName} = model;
    const {historicalValue} = item;
    const factId = historicalValue?.factId;
    const timeSeriesApi = useTimeSeries()
    const [options, setOptions] = useState<Highcharts.Options>()
    const [loading, setLoading] = useState(true)

    const [name, setName1] = useState<string>(totalRevenueConceptName)

    function setName(name: string) {
        setName1(name);
        refresh(name);
    }

    async function refresh(name: string) {
        if (factId) {
            setLoading(true);
            const {data: factTimeSeries} = await timeSeriesApi.getTimeSeriesForFact(
                cik,
                factId,
                [name],
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
                            return `${readableNumber(this.value)}`
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
        refresh(name)
    }, [])
    return (
        <section>
            <Label className="mb-4">Visual Comparison</Label>
            {
                loading
                    ?
                    <div className="h-64 flex items-center justify-center">
                        <Loading/><span>Loading ...</span>
                    </div>
                    : <HighchartsReact highcharts={highcharts} options={options}/>
            }
            <form className="space-y-1 text-sm">
                <div className="space-x-1 flex items-center">
                    <input
                        type="radio"
                        name={totalRevenueConceptName}
                        checked={name === totalRevenueConceptName}
                        onClick={() => setName(totalRevenueConceptName)}
                    />
                    <label htmlFor={totalRevenueConceptName}>Revenue</label>
                </div>
                <div className="space-x-1 flex items-center">
                    <input
                        type="radio"
                        name={netIncomeConceptName}
                        checked={name === netIncomeConceptName}
                        onClick={() => setName(netIncomeConceptName)}
                    />
                    <label htmlFor={netIncomeConceptName}>Net Income</label>
                </div>
            </form>
        </section>
    )
}