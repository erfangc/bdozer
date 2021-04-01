import React, { ReactNode } from 'react'
import { StockAnalysis } from '../../../client'
import { EarningsPerShareBasic, TerminalValuePerShare } from '../../../constants';
import { year } from '../../../year';

interface Props {
    result: StockAnalysis
}

export function Narrative(props: Props) {
    const {
        model,
        model: { name },
        cells,
        currentPrice
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
            className="w-full px-6" id={id}
            style={{ scrollSnapAlign: 'start', flexShrink: 0, transformOrigin: 'center center', transform: 'scale(1)', transition: 'transform 0.5s' }}
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
        model: { name },
        cells,
        currentPrice
    } = props.result;

    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value
    const upside = ((finalTvps / currentPrice) - 1) * 100

    return (
        <PageWrapper id="page3">
            <h1 className='font-extrabold text-2xl mt-12'>
                How did we arrive at $4.1 earnings per share by 2025?
            </h1>

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
        currentPrice
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