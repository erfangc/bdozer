import React from "react";
import { StockAnalysis } from "../../../../client";
import { EarningsPerShareBasic } from "../../../../constants/ReservedItemNames";
import { simpleNumber } from "../../../../simple-number";
import { SubTitle } from "../../../Title";

interface Props {
    result: StockAnalysis
}
export function ExecutiveSummary(props: Props) {
    const {
        result: {
            cells,
            model: { name, periods, },
            businessWaterfall,
            zeroGrowthPrice,
            targetPrice,
            currentPrice,
            revenueCAGR,
        }
    } = props;

    const { profit, topExpenses, revenue } = businessWaterfall[0]
    const upside = (targetPrice / currentPrice - 1) * 100
    const totalExpense = topExpenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === EarningsPerShareBasic && cell.period === 0)?.value

    return (
        <div>
            <SubTitle className="mb-6">Executive Summary</SubTitle>
            <ul className="list-disc pl-4 space-y-4">
                <li>
                    Last year, {name} made ${simpleNumber(revenue.value)} revenue.
                </li>
                <li>
                    They spend more than ${simpleNumber(totalExpense)} with a {profit.value > 0 ? 'profit' : 'loss'} of ${simpleNumber(profit.value)}.
                </li>
                <li>
                    This left investors ${eps.toFixed(1)} per share.
                </li>
                <li>
                    If they stop growing , the company will be worth ${zeroGrowthPrice.toFixed(1)} per share.
                </li>
                <li>
                    Based on Wall Street forecasts, the company will grow at {(revenueCAGR * 100).toFixed(1)}% a year for the next {periods} years.
                    That means {name} will be worth ${targetPrice.toFixed(1)}, which represents <span className="font-bold text-lime-400">{upside.toFixed(1)}%</span> upside from current price.
                </li>
            </ul>
        </div>
    )
}