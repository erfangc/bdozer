import {Button} from "../../../Common2/Button";
import React from "react";
import {StockAnalysis2} from "../../../../client";
import {PrimaryButton} from "../../../Common2/PrimaryButton";
import {readableMoney, readablePercent} from "../../../../number-formatters";
import {ShareAnalysisButton} from "./ShareAnalysisButton";
import {tvps} from "../tvps";
import {upside} from "../upside";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Summary({stockAnalysis}: Props) {

    const {
        ticker,
        name,
        cells,
        derivedStockAnalytics: {
            currentPrice,
            businessWaterfall,
            revenueCAGR,
        },
        model: {
            periods,
            epsConceptName,
        },
        lastUpdated,
    } = stockAnalysis;

    const finalPrice = tvps(stockAnalysis);
    const upside1 = upside(stockAnalysis);
    const {profit, expenses, revenue,} = businessWaterfall[0]
    const totalExpense = expenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === epsConceptName && cell.period === 0)?.value;

    return (
        <section className="bg-navy-100 p-6 rounded-lg w-card" id="summary">
            {/* Row 1 */}
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center">
                        <h1 className="heading1 text-lime-100">{ticker}</h1>
                        <span className="lg:border-l lg:pl-4 lg:ml-4">{name}</span>
                    </div>
                    <div className="space-x-2 flex pt-4">
                        {/* TODO make these work */}
                        <Button>Change Assumption</Button>
                        {/* TODO make these work */}
                        <Button>Download Model</Button>
                        <ShareAnalysisButton/>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <PrimaryButton>Watching</PrimaryButton>
                    <div className="text-xs leading-4 text-lightGreen-25">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="justify-evenly items-center flex pt-10 pb-4 border-b">
                <div className="text-lime-100">
                    <span className="label-small">Upside</span>
                    <h1 className="font-mono numbers-large">{readablePercent(finalPrice / currentPrice - 1)}</h1>
                </div>
                <span className="w-px h-8 border-l"/>
                <div>
                    <span className="label-small">Estimated Price</span>
                    <h1 className="font-mono numbers-medium">
                        ${finalPrice.toLocaleString('US', {currency: 'USD', maximumSignificantDigits: 4})}
                    </h1>
                </div>
                <span className="w-px h-8 border-l"/>
                <div>
                    <span className="label-small">Current Price</span>
                    <h1 className="font-mono numbers-medium">
                        ${currentPrice.toLocaleString('US', {currency: 'USD', maximumSignificantDigits: 4})}
                    </h1>
                </div>
            </div>

            {/*  Row 3  */}
            <div>
                <h3 className="pt-6 heading3 text-gray-2">Summary</h3>
                <p className="pt-6">
                    <h4 className="heading4">Current Business Situation</h4>
                    <br/>
                    <ul>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                Last year, {name} made {readableMoney(revenue.value)} revenue
                            </li>
                            <li>
                                The company spent {readableMoney(totalExpense)}, leading
                                to {readableMoney(profit.value)} in {profit.value > 0 ? 'profit' : 'losses'}
                            </li>
                            <li>
                                As a result, investors {eps > 0 ? 'made' : 'lost'} <b>{readableMoney(eps)}</b> per share
                            </li>
                        </ul>
                    </ul>
                </p>
                <br/>
                <p>
                    <h4 className="heading4">Future Projections</h4>
                    <br/>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            Based on Wall Street forecasts, the company will grow {readablePercent(revenueCAGR)}% a year
                            for the next {periods} years
                        </li>
                        <li>
                            Given this, {name}'s value fair today is {readableMoney(finalPrice)}, which represents
                            <span className={`font-bold ${upside1 > 0 ? 'text-lime-400' : 'text-rose-500'}`}>
                                {readablePercent(upside1)}%
                            </span>
                            {upside1 > 0 ? 'upside' : 'downside'} from current price
                        </li>
                    </ul>
                </p>
            </div>
        </section>
    )
}

