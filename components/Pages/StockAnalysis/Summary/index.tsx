import {Button} from "../../../Common2/Button";
import React from "react";
import {StockAnalysis2} from "../../../../client";
import {PrimaryButton} from "../../../Common2/PrimaryButton";
import {readableMoney, readablePercent} from "../../../../number-formatters";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Summary({stockAnalysis}: Props) {

    const {
        ticker,
        name,
        derivedStockAnalytics: {
            targetPrice,
            currentPrice,
            businessWaterfall,
            revenueCAGR,
        },
        cells,
        model: {
            periods,
            epsConceptName
        },
        lastUpdated,
    } = stockAnalysis;

    const upside = (targetPrice / currentPrice - 1) * 100

    const {profit, expenses, revenue,} = businessWaterfall[0]

    const totalExpense = expenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === epsConceptName && cell.period === 0)?.value

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
                        <Button>Change Assumption</Button>
                        <Button>Download Model</Button>
                        <ShareButton/>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <PrimaryButton>Watching</PrimaryButton>
                    <div className="text-xs leading-4 text-lightGreen-25">Last
                        updated: {new Date(lastUpdated).toLocaleString()}</div>
                </div>
            </div>
            {/* Row 2 */}
            <div className="justify-evenly items-center flex pt-10 pb-4 border-b">
                <div className="text-lime-100">
                    <span className="label-small">Upside</span>
                    <h1 className="font-mono numbers-large">{readablePercent(targetPrice / currentPrice - 1)}</h1>
                </div>
                <span className="w-px h-8 border-l"/>
                <div>
                    <span className="label-small">Fair Price</span>
                    <h1 className="font-mono numbers-medium">
                        ${targetPrice.toLocaleString('US', {currency: 'USD', maximumSignificantDigits: 4})}
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
                            Given this, {name}'s value fair today is {readableMoney(targetPrice)}, which represents
                            <span
                                className={`font-bold ${upside > 0 ? 'text-lime-400' : 'text-rose-500'}`}> {upside.toFixed(1)}% </span>
                            {upside > 0 ? 'upside' : 'downside'} from current price
                        </li>
                    </ul>
                </p>
            </div>
        </section>
    )
}

function ShareButton() {
    return (
        <Button className="w-8 flex justify-center items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 10.7234C11.4933 10.7234 11.0367 10.92 10.69 11.2367L5.94 8.46668C5.97667 8.31668 6 8.16002 6 8.00002C6 7.84002 5.97667 7.68335 5.94 7.53335L10.64 4.79002C10.9967 5.12335 11.4733 5.33002 12 5.33002C13.1033 5.33002 14 4.43335 14 3.33002C14 2.22668 13.1033 1.33002 12 1.33002C10.8967 1.33002 10 2.22668 10 3.33002C10 3.49002 10.0233 3.64668 10.06 3.79668L5.36 6.54002C5.00333 6.20668 4.52667 6.00002 4 6.00002C2.89667 6.00002 2 6.89668 2 8.00002C2 9.10335 2.89667 10 4 10C4.52667 10 5.00333 9.79335 5.36 9.46002L10.11 12.23C10.0767 12.37 10.0567 12.5167 10.0567 12.6667C10.0567 13.74 10.9267 14.61 12 14.61C13.0733 14.61 13.9433 13.74 13.9433 12.6667C13.9433 11.5934 13.0733 10.7234 12 10.7234Z"
                    fill="#0B1E33"
                />
            </svg>
        </Button>
    )
}