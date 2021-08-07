import {Button} from "../../../Common2/Button";
import React from "react";
import {StockAnalysis2} from "../../../../client";
import {PrimaryButton} from "../../../Common2/PrimaryButton";
import {readableMoney, readablePercent} from "../../../../number-formatters";
import {ShareAnalysisButton} from "./ShareAnalysisButton";
import {tvps} from "../tvps";
import {upside} from "../upside";
import {Statistic} from "./Statistic";

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
        <section className="bg-navy-100 p-6 space-y-6 rounded-lg w-mobileCard lg:w-card" id="summary">
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center flex-col lg:flex-row">
                        <h1 className="heading1 text-lime-100">{ticker}</h1>
                        <span className="lg:border-l lg:pl-4 lg:ml-4">{name}</span>
                    </div>
                    <div className="space-x-2 pt-4 hidden lg:flex">
                        {/* TODO make these work */}
                        <Button>Change Assumption</Button>
                        {/* TODO make these work */}
                        <Button>Download Model</Button>
                        <ShareAnalysisButton/>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <PrimaryButton>Watching</PrimaryButton>
                    <div className="text-xs leading-4 text-lightGreen-25 hidden lg:block">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </div>
                </div>
            </div>
            <Statistic stockAnalysis={stockAnalysis}/>
            <div className="space-y-6">
                <h3 className="heading3 text-gray-2">Summary</h3>
                <p>
                    <h4 className="heading4">Current Business Situation</h4>
                    <br/>
                    <ul>
                        <ul className="list-disc list-inside space-y-1">
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
                <p>
                    <h4 className="heading4">Future Projections</h4>
                    <br/>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Based on Wall Street forecasts, the company will grow {readablePercent(revenueCAGR)}% a year
                            for the next {periods} years
                        </li>
                        <li>
                            Given this, {name}'s value fair today is {readableMoney(finalPrice)}, which represents <span
                            className={`font-bold ${upside1 > 0 ? 'text-lime-400' : 'text-rose-500'}`}>
                                {readablePercent(upside1)}
                            </span> {upside1 > 0 ? 'upside' : 'downside'} from current price
                        </li>
                    </ul>
                </p>
            </div>
        </section>
    )
}

