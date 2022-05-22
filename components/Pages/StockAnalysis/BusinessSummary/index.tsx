import React from 'react';
import {StockAnalysis2} from "../../../../client";
import {readableMoney, readablePercent} from "../../../../number-formatters";
import {tvps} from "../tvps";
import {year} from "../../../../year";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function BusinessSummary({stockAnalysis}: Props) {
    const {
        name,
        cells,
        derivedStockAnalytics: {
            businessWaterfall,
            revenueCAGR,
            percentUpside,
        },
        model,
        model: {
            periods,
            epsConceptName,
        },
    } = stockAnalysis;

    const finalPrice = tvps(stockAnalysis);
    const {profit, expenses, revenue,} = businessWaterfall[0]
    const totalExpense = expenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === epsConceptName && cell.period === 0)?.value;

    return (
        <section className="bg-navy-100 p-6 space-y-10 rounded-lg w-mobileCard lg:w-card" id="business-summary">
            <h3 className="heading3 text-gray-2">Business Summary</h3>
            <p>
                <h4 className="heading4">Current Business Situation</h4>
                <br/>
                <ul>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Last year, {name} made <span className="text-lime-100">{readableMoney(revenue.value)}</span> revenue
                        </li>
                        <li>
                            The company spent <span className="text-red-100">{readableMoney(totalExpense)}</span>, leading
                            to {readableMoney(profit.value)} in {profit.value > 0 ? 'profit' : 'losses'}
                        </li>
                        <li>
                            As a result, investors {eps > 0 ? 'made' : 'lost'} {readableMoney(eps)} per share
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
                        Given this, we project {name}'s to be worth {readableMoney(finalPrice)} per share in {year(model, periods)}, which represents <span
                        className={`${percentUpside > 0 ? 'text-lime-100' : 'text-red-100'}`}>
                                {readablePercent(percentUpside)}
                            </span> {percentUpside > 0 ? 'upside' : 'downside'} from current price
                    </li>
                </ul>
            </p>
        </section>
    );
}