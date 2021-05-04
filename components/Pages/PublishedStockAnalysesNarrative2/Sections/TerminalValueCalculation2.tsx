import React from 'react'
import {StockAnalysis2} from "../../../../client";
import {Label, SubTitle} from "../../../Common/Title";
import {year} from "../../../../year";
import {simpleMoney, simpleNumber, simplePercent} from "../../../../simple-number";
import {Emphasis} from "../Emphasis";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TerminalValueCalculation2({stockAnalysis}: Props) {

    const {name, ticker, derivedStockAnalytics, model, cells} = stockAnalysis
    const {discountRate, irr, revenueCAGR, currentPrice} = derivedStockAnalytics
    const {periods, epsConceptName, terminalGrowthRate, beta, equityRiskPremium} = model

    /*
    Prepare calcualtions
     */
    const finalFiscalYear = year(periods);
    const finalEps = simpleMoney(cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value)
    const fy0Eps = cells.find(cell => cell.item?.name === epsConceptName && cell.period == 0)?.value
    const finalTvps = cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value
    const finalPe = simpleNumber(1 / (discountRate - terminalGrowthRate))
    const fy0Pe = currentPrice / fy0Eps;

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
            We expect the company to grow by {simplePercent(revenueCAGR)} per year for the next {periods} years, then grow steadily at {simplePercent(terminalGrowthRate)} thereafter
        </>
    )

    const totalReturn = finalTvps / currentPrice - 1;
    const annualizedReturn = Math.pow(totalReturn + 1, 1/ periods) - 1;

    return (
        <div>
            <SubTitle className="mb-6">{ticker}'s Price in {periods} Years</SubTitle>
            <div className="space-y-10">
                <div className="space-y-4">
                    <p>
                        If {name} earns <Emphasis>{finalEps}</Emphasis> / share in {finalFiscalYear}, it will be
                        worth <Emphasis>{simpleMoney(finalTvps)}</Emphasis> at that time
                    </p>
                    <p>
                        If you held and sold at that price, you would have earned <Emphasis>{simplePercent(annualizedReturn)}</Emphasis> per year on this investment.
                        Or <Emphasis>{simplePercent(totalReturn)}</Emphasis> in total, not including dividends
                    </p>
                </div>
                <div className="space-y-4">
                    <Label>How to Derive {simpleMoney(finalTvps)}</Label>
                    <div className="p-2 bg-blueGray-800 flex justify-center">
                        <table>
                            <thead>
                                <th className="text-right px-2">{finalFiscalYear} Price</th>
                                <th className="text-right px-2"/>
                                <th className="text-right px-2">{finalFiscalYear} EPS</th>
                                <th className="text-right px-2"/>
                                <th className="text-right px-2">{finalFiscalYear} P/E</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-right px-2">{simpleMoney(finalTvps)}</td>
                                    <td className="text-right px-2"><span className="font-semibold text-lg">=</span></td>
                                    <td className="text-right px-2">{finalEps}</td>
                                    <td className="text-right px-2"><span className="font-semibold text-lg">x</span> </td>
                                    <td className="text-right px-2">{finalPe}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <Emphasis>{finalPe}</Emphasis> is how much investors would be willing to
                        pay for each dollar of earning in the year {finalFiscalYear}. It is the projected Price-to-Earnings (P/E) ratio
                    </p>
                    {fy0Eps > 0 ? <p>As a reference, the P/E ratio for {ticker} today is <Emphasis>{simpleNumber(fy0Pe)}</Emphasis></p> : null}
                </div>
                <div className="space-y-4">
                    <Label>Factors that Affect P/E</Label>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Business risk</li>
                        <li>Market condition</li>
                        <li>Growth rate</li>
                    </ol>
                </div>
                <div className="space-y-4">
                    <Label>In {ticker}'s Case</Label>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>{businessRiskBullet}</li>
                        <li>We expect the stock market to return {simplePercent(equityRiskPremium)} on average</li>
                        <li>{growthRateBullet}</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
