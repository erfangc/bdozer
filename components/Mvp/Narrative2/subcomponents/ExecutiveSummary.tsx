import React from "react";
import { StockAnalysis } from "../../../../client";
import { EarningsPerShareBasic } from "../../../../constants/ReservedItemNames";
import { simpleNumber } from "../../../../simple-number";
import { SubTitle } from "../../../Title";
import { Popover } from "../../Narrative1/Narrative";
import { RevenueTimeSeries } from "./RevenueTimeSeries";

interface Props {
    result: StockAnalysis
}
export function ExecutiveSummary(props: Props) {
    const {
        result,
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

    const { profit, expenses, revenue } = businessWaterfall[0]
    const upside = (targetPrice / currentPrice - 1) * 100
    const totalExpense = expenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === EarningsPerShareBasic && cell.period === 0)?.value

    const growthRatePopover = (
        <Popover trigger={`${(revenueCAGR * 100).toFixed(1)}%`}>
            <RevenueTimeSeries result={result} />
        </Popover>
    )
    return (
        <div>
            <SubTitle className="mb-6">Executive Summary</SubTitle>
            <div className="font-bold mt-8 mb-4">Current Business Situation</div>
            <ul className="list-disc pl-4 space-y-2">
                <li>
                    Last year, {name} made ${simpleNumber(revenue.value)} revenue.
                </li>
                <li>
                    They spend more than ${simpleNumber(totalExpense)} with a {profit.value > 0 ? 'profit' : 'loss'} of ${simpleNumber(profit.value)}.
                </li>
                <li>
                    Investors {eps > 0 ? 'made' : 'lost'} ${eps.toFixed(1)} per share.
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