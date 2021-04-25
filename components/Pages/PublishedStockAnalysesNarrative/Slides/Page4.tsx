import HighchartsReact from 'highcharts-react-official';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useFactBaseUnsecured} from '../../../../api-hooks';
import {StockAnalysis2} from '../../../../client';
import {blueGray50, highcharts} from '../../../../highcharts';
import {simpleNumber} from '../../../../simple-number';
import {year} from '../../../../year';
import {Navigation} from '../Navigation';
import {PageTitle} from '../PageTitle';
import {PageWrapper} from '../PageWrapper';

interface Props {
    result: StockAnalysis2
}

export function Page4({ result }: Props) {

    const router = useRouter()
    const { cik } = router.query
    const factBase = useFactBaseUnsecured()
    const [options, setOptions] = useState<Highcharts.Options>()
    const { cells, model } = result
    const revenue = result?.derivedStockAnalytics?.businessWaterfall[0]?.revenue
    const factId = revenue?.item?.historicalValue?.factId

    const revenueFy0 = cells.find(cell => cell.period === 0 && cell.item.name === revenue.item.name)?.value?.toFixed(0)
    const revenueFinal = cells.find(cell => cell.period === model.periods && cell.item.name === revenue.item.name)?.value?.toFixed(0)

    async function refresh() {
        if (!factId) {
            return
        }
        const { data: factTimeSeries } = await factBase.getAnnualTimeSeries(factId);

        const futureData = cells
            .filter(cell => cell.item.name === revenue?.item.name && cell.period !== 0)
            .map(cell => {
                return {
                    x: year(cell.period),
                    y: cell.value,
                }
            })

        const pastData = factTimeSeries.map(fact => {
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
                    enabled: false,
                },
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        useHTML: false,
                        style: {
                            color: blueGray50,
                        },
                        formatter: function () {
                            return `<div class="text-white z-0">${simpleNumber(this.y.toFixed(0), true)}</div>`;
                        },
                    },
                },
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
                    Our analysis relies on revenue growing from ${simpleNumber(revenueFy0)} to ${simpleNumber(revenueFinal)}.
                    Below shows historical and projected revenues year by year.
                </p>
                <div className="w-full">
                    <HighchartsReact highcharts={highcharts} options={options} />
                </div>
                <div>
                    <div>Want to see more?</div>
                    <div className="flex space-x-2">
                        <Link href={`/${cik}/narrative2`}>
                            <a className="bg-blue-500 px-6 py-3 rounded text-white">See the Full Analysis «</a>
                        </Link>
                    </div>
                </div>
                <Navigation prev="page3" />
            </div>
        </PageWrapper >
    )
}
