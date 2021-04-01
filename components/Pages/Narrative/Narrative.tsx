import HighchartsReact from 'highcharts-react-official';
import React, { ReactNode } from 'react'
import { Item, StockAnalysis } from '../../../client'
import { EarningsPerShareBasic, TerminalValuePerShare } from '../../../constants';
import { lime700, rose500, blueGray900, highcharts } from '../../../highcharts';
import { simpleNumber } from '../../../simple-number';
import { year } from '../../../year';

interface Props {
    result: StockAnalysis
}

export function Narrative(props: Props) {
    const {
        model,
        model: { name },
        cells,
        currentPrice,
    } = props.result;

    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value
    const upside = ((finalTvps / currentPrice) - 1) * 100

    return (
        <div className="text-blueGray-100 flex slides">
            <Page1 {...props} />
            <Page2 {...props} />
            <Page3 {...props} />
            <Page4 {...props} />
        </div>
    )
}

function PageWrapper({ children, id }: { children: ReactNode, id: string }) {
    return (
        <div
            className="w-full px-6 slide"
            id={id}
        >
            {children}
        </div>
    )
}

function Page1(props: Props) {
    const {
        model,
        model: { name },
        cells,
        currentPrice
    } = props.result;

    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value
    const upside = ((finalTvps / currentPrice) - 1) * 100

    return (
        <PageWrapper id="page1">
            <h1 className='font-extrabold text-2xl mt-12'>
                What is <br />{name} worth?
            </h1>
            <p className="mt-20">
                This stock is trading at <b>${currentPrice.toFixed(1)}</b> today
            </p>
            <p className="mt-8">
                Our analysis indicate that it could be worth ${finalTvps.toFixed(1)} in {model.periods - 1} years.
                Including dividends this could be a <span className={`${upside > 0 ? 'text-lime-500' : 'text-rose-500'} font-bold`}>{upside.toFixed(1)}%</span> return opportunity
            </p>
            <p className="mt-20 mb-6">
                How did we arrive at the ${finalTvps.toFixed(1)} target price?
            </p>
            <a href="#page2" className="font-bold">
                Read more
            </a>
        </PageWrapper>
    )
}

function Page2(props: Props) {
    const {
        model,
        model: { name, terminalGrowthRate },
        cells,
        discountRate,
    } = props.result;

    const terminalPe = (1 / (discountRate - terminalGrowthRate)).toFixed(1)
    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value
    const eps = cells.find(cell => cell.item?.name === EarningsPerShareBasic && cell.period == 0)?.value
    const finalEps = cells.find(cell => cell.item?.name === EarningsPerShareBasic && cell.period == model.periods)?.value

    return (
        <PageWrapper id="page2">
            <h1 className='font-extrabold text-2xl mt-12'>
                How did we<br />
                arrive at ${finalTvps.toFixed(1)} / share<br />by {year(model.periods)}?
            </h1>
            <p className="mt-20">
                {name} made ${eps.toFixed(1)} / share in {year(0)}, due to dramatic decrease in revenue
            </p>
            <p className="mt-12">
                However, their earnings per share is expected to recover to ${finalEps.toFixed(1)} / share in {year(model.periods)}
            </p>
            <p className="mt-12 mb-4">
                Normally a business like {name} should be trading at {terminalPe}x earnings per share
            </p>
            <div className="p-3 rounded bg-blueGray-700 my-4 text-center">
                {terminalPe} x ${finalEps.toFixed(1)} = ${finalTvps.toFixed(1)} / share
            </div>
            <p className="mb-6">
                How do we know earnings per share should be ${finalEps.toFixed(1)}?
            </p>
            <a href="#page3" className="font-bold">
                Read more
            </a>
        </PageWrapper>
    )
}

function Page3(props: Props) {
    const {
        model,
        model: { symbol, },
        cells,
        businessWaterfall,
    } = props.result

    const finalEps = cells.find(cell => cell.item?.name === EarningsPerShareBasic && cell.period == model.periods)?.value
    const waterfall = businessWaterfall[0]

    const revenue = {
        name: waterfall.revenue.item?.description ?? waterfall.revenue.item?.name,
        y: waterfall.revenue.value,
        color: lime700,
        item: waterfall.revenue.item,
    }

    const topExpenses = waterfall.expenses.map(({ item, value }) => {
        return {
            name: item.description ?? item.name,
            y: value,
            color: value > 0 ? lime700 : rose500,
            item: item,
        }
    })

    const profit = {
        name: waterfall.profit.item?.description ?? waterfall.profit.item?.name,
        y: waterfall.profit.value,
        color: blueGray900,
        borderColor: waterfall.profit.value > 0 ? lime700 : rose500,
        borderWidth: 1,
        isSum: true,
    }

    const options: Highcharts.Options = {
        chart: { type: 'waterfall', },
        tooltip: {
            enabled: true,
            useHTML: true,
            formatter: function () {
                const item = (this.point.options as any).item as Item
                const commentary = item?.commentaries?.commentary
                return commentary
                    ?
                    `
                    <div class="px-2 text-blueGray-50 z-10">
                        <span>${commentary}</span>
                    </div>
                    `
                    :
                    `<div class="px-2  text-blueGray-50 z-10">No commentary</div>`;
            },
        },
        xAxis: { type: 'category', lineWidth: 0, },
        title: { text: null },
        yAxis: {
            title: { text: null },
            labels: { enabled: false }
        },
        legend: { enabled: false },
        series: [{
            data: [revenue, ...topExpenses, profit,],
            pointPadding: 0,
            dataLabels: {
                enabled: true, useHTML: false,
                formatter: function () {
                    return `<div class="z-0">${simpleNumber(this.y.toFixed(0), true)}</div>`;
                },
            },
        }] as any
    }

    return (
        <PageWrapper id="page3">
            <h1 className='font-extrabold text-2xl mt-12'>
                How did we arrive at ${finalEps.toFixed(1)} earnings per share by {year(model.periods)}?
            </h1>
            <h2 className="mt-16">
                {year(0)}, {symbol}'s profit was ${simpleNumber(businessWaterfall[0]?.profit?.item?.historicalValue?.value)}
            </h2>
            <HighchartsReact highcharts={highcharts} options={options} />
            <a href="#page4" className="font-bold">
                Read more
            </a>
        </PageWrapper>
    )
}

function Page4(props: Props) {
    const {
        model,
        model: { name },
        cells,
        currentPrice,
    } = props.result;

    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value
    const upside = ((finalTvps / currentPrice) - 1) * 100

    return (
        <PageWrapper id="page4">
            <h1 className='font-extrabold text-2xl mt-12'>
                What is <br />{name} worth?
            </h1>
            <p className="mt-20">
                This stock is trading at <b>${currentPrice.toFixed(1)}</b> today
            </p>
            <p className="mt-8">
                Our analysis indicate that it could be worth ${finalTvps.toFixed(1)} in {model.periods - 1} years.
                Including dividends this could be a <span className={`${upside > 0 ? 'text-lime-500' : 'text-rose-500'} font-bold`}>{upside.toFixed(1)}%</span> return opportunity
            </p>
            <p className="mt-20 mb-6">
                How did we arrive at the ${finalTvps.toFixed(1)} target price?
            </p>
            <a href="#page1" className="font-bold">
                Back
            </a>
        </PageWrapper>
    )
}
