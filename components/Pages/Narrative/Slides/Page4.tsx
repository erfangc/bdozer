import HighchartsReact from 'highcharts-react-official';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFactBaseUnsecured } from '../../../../api-hooks';
import { StockAnalysis } from '../../../../client';
import { highcharts } from '../../../../highcharts';
import { simpleNumber } from '../../../../simple-number';
import { year } from '../../../../year';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import { PageWrapper } from '../PageWrapper';

interface Props {
    result: StockAnalysis
}

export function Page4({ result }: Props) {

    const router = useRouter()
    const { cik } = router.query
    const factBase = useFactBaseUnsecured()
    const [options, setOptions] = useState<Highcharts.Options>()
    const { cells, model: { name } } = result
    const revenue = result.businessWaterfall[0]?.revenue
    const factId = revenue?.item?.historicalValue?.factId

    async function refresh() {
        const { data: factTimeSeries } = await factBase.getFactTimeSeries(factId)

        const futureData = cells
            .filter(cell => cell.item.name === revenue?.item.name && cell.period !== 0)
            .map(cell => {
                return {
                    x: year(cell.period),
                    y: cell.value,
                }
            })

        const pastData = factTimeSeries.fyFacts.map(fact => {
            return {
                x: new Date(fact.documentPeriodEndDate).getFullYear(),
                y: fact.doubleValue,
            }
        })

        const options: Highcharts.Options = {
            chart: {
                type: 'column',
                height: 300
            },
            title: { text: null, },
            yAxis: {
                title: { text: null, },
                labels: {
                    formatter: function () {
                        return `${simpleNumber(this.value)}`
                    }
                }
            },
            plotOptions: {
                column: {
                    pointWidth: 35,
                }
            },
            xAxis: { lineWidth: 0, tickWidth: 0, },
            series: [
                { data: pastData, name: 'Past Revenue', },
                { data: futureData, name: 'Projected Revenue', }
            ] as any
        }
        setOptions(options)
    }
    useEffect(() => {
        refresh()
    }, [])
    return (
        <PageWrapper id="page4">
            <div className="w-full space-y-12 mt-20">
                <PageTitle>Revenue Past and Future</PageTitle>
                <p>
                    Median analyst estimate for {name}'s revenue going forward. <br />
                    <span className="font-bold text-blue-400">Blue</span> columns
                    show historical revenue.
                </p>
                <div className="w-full">
                    <HighchartsReact highcharts={highcharts} options={options} />
                </div>
                <div>
                    <div className="mb-6">
                        Want to see more?
                    </div>
                    <Link href={`/${cik}/narrative2`}><a className="bg-blue-500 px-6 py-4 rounded">See the Full Analysis «</a></Link>
                </div>
                <Navigation prev="page3" />
            </div>
        </PageWrapper>
    )
}