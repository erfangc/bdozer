import React from 'react';
import {StockAnalysis2} from "../../../../client";
import {commafy, readableNumber, readablePercent} from "../../../../number-formatters";
import {year} from "../../../../year";
import {tvps} from "../tvps";
import {Statistic} from "./Statistic";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function PriceForecast({stockAnalysis}: Props) {
    const {
        name,
        model: {
            periods,
            epsConceptName,
            terminalGrowthRate,
            beta,
            equityRiskPremium,
        },
        cells,
        derivedStockAnalytics: {
            revenueCAGR,
            discountRate,
        },
    } = stockAnalysis;

    const finalTvps = tvps(stockAnalysis);
    const finalEps = cells.find(cell => cell.item?.name === epsConceptName && cell.period == periods)?.value;
    const finalPe = readableNumber(1 / (discountRate - terminalGrowthRate));

    /*
    Business risk bullet point
     */
    let businessRiskBullet = <>{name}'s business is about as risky as the average S&P 500 company</>
    if (beta > 1.5) {
        businessRiskBullet = <>{name}'s business is significantly riskier than the average S&P 500 company</>
    } else if (beta < 0.7) {
        businessRiskBullet = <>{name}'s business is significantly safer than the average S&P 500 company</>
    } else if (beta > 1.2) {
        businessRiskBullet = <>{name}'s business is slightly riskier than that of the average S&P 500 company</>
    } else if (beta < 0.9) {
        businessRiskBullet = <>{name}'s business is slightly more stable than that of the average S&P 500 company</>
    }

    /*
    Growth rate bullet point
     */
    let growthRateBullet = (
        <>
            We expect the company to grow by {readablePercent(revenueCAGR)} per year for the next {periods} years, then
            grow steadily at {readablePercent(terminalGrowthRate)} thereafter
        </>
    )

    return (
        <section className="bg-navy-100 p-6 rounded-lg space-y-8 w-mobileCard lg:w-card" id="price-forecast">
            {/* Section 1 */}
            <div>
                <h3 className="heading3 mb-1">Price Forecast</h3>
                <p className="paragraph-regular">
                    How is {name} forecast to grow in the next {periods} years based on our analysis
                </p>
            </div>

            {/* Section 2 */}
            <Statistic stockAnalysis={stockAnalysis}/>

            {/* Section 3 */}
            <div>
                <h5 className="heading5 mb-4 pb-2 border-b">Our Calculations</h5>
                <p className="paragraph-regular">
                    To compute a price forecast, we multiply earnings per share (EPS) by Price-to-Earnings (P/E) ratio
                    (or how much investors would be willing to pay for each dollar of earning)
                </p>
                <br/>
                <div className="px-6 py-4 bg-deepNavy-100">
                    <table className="w-full">
                        <thead>
                        <tr className="label-regular border-b">
                            <th className="text-left pb-4 w-24 px-2">EPS</th>
                            <th/>
                            <th className="text-left pb-4 px-2">P/E</th>
                            <th/>
                            <th className="text-left pb-4 px-2">{year(periods)} Price Estimate</th>
                        </tr>
                        </thead>
                        <tbody className="font-mono numbers-regular">
                        <tr>
                            <td className="font-light text-left text-blueGray-300 px-2 py-2">{readableNumber(finalEps)}</td>
                            <td className="text-left px-2 py-2">x</td>
                            <td className="text-left px-2">{finalPe}</td>
                            <td className="text-left px-2">=</td>
                            <td className="text-left px-2">${commafy(finalTvps)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 4 */}
            <div>
                <h5 className="heading5">What is P/E</h5>
                <p className="mt-4 paragraph-regular">
                    The price-to-earnings ratio (P/E) is the ratio for valuing a company that measures its current share
                    price relative to its per-share earnings.
                    It can be affected by many factors including: Business risk, Market condition, and Growth rate.
                </p>
            </div>
            <div>
                <p className="paragraph-bold">
                    {name}'s P/E
                </p>
                <div className="space-y-5 mt-5">
                    <div>
                        <p className="small-text-bold">Business Risk</p>
                        <p>
                            {businessRiskBullet}
                        </p>
                    </div>
                    <div>
                        <p className="small-text-bold">Market Condition</p>
                        <p>
                            We expect the stock market to return {readablePercent(equityRiskPremium)} on average
                        </p>
                    </div>
                    <div>
                        <p className="small-text-bold">Growth Rate</p>
                        <p>{growthRateBullet}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
