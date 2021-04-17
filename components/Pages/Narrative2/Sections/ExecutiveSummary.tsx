import React from "react";
import { StockAnalysis2 } from "../../../../client";
import { simpleMoney } from "../../../../simple-number";
import { AnchorPopover } from "../../../Popover";
import { SubTitle } from "../../../Common/Title";
import { RevenueTimeSeries } from "./RevenueTimeSeries";

interface Props {
    result: StockAnalysis2
}
export function ExecutiveSummary(props: Props) {
    const {
        result,
        result: {
            cells,
            name,
            model: { periods, epsConceptName, },
            derivedStockAnalytics: {
                businessWaterfall,
                zeroGrowthPrice,
                targetPrice,
                currentPrice,
                revenueCAGR,
            }
        }
    } = props;

    const { profit, expenses, revenue, } = businessWaterfall[0]

    const upside = (targetPrice / currentPrice - 1) * 100
    const totalExpense = expenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === epsConceptName && cell.period === 0)?.value

    const growthRatePopover = (
        <AnchorPopover trigger={`${(revenueCAGR * 100).toFixed(1)}%`}>
            <RevenueTimeSeries result={result} />
        </AnchorPopover>
    )
    return (
        <div>
            <SubTitle className="mb-6">Executive Summary</SubTitle>
            <div className="font-bold mt-8 mb-4">Current Business Situation</div>
            <ul className="list-disc pl-4 space-y-2">
                <li>
                    Last year, {name} made {simpleMoney(revenue.value)} revenue.
                </li>
                <li>
                    They spend more than {simpleMoney(totalExpense)} with a {profit.value > 0 ? 'profit' : 'loss'} of {simpleMoney(profit.value)}.
                </li>
                <li>
                    Investors {eps > 0 ? 'made' : 'lost'} {eps?.toFixed(1)} per share.
                </li>
            </ul>
            <div className="font-bold mt-8 mb-4">Future Projections</div>
            <ul className="list-disc pl-4 space-y-2">
                <li>
                    If they stop growing, the company will be worth ${zeroGrowthPrice.toFixed(1)} per share.
                </li>
                <li>
                    Based on Wall Street forecasts, the company will grow at {growthRatePopover} a year for the next {periods} years.
                    That means {name} will be worth ${targetPrice.toFixed(1)}, which represents <span className={`font-bold ${upside > 0 ? 'text-lime-400' : 'text-rose-500'}`}>
                        {upside.toFixed(1)}%
                    </span> {upside > 0 ? 'upside' : 'downside'} from current price.
                </li>
            </ul>
        </div>
    )
}