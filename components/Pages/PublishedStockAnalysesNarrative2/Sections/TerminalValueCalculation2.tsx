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
    const finalTvps = simpleMoney(cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value)
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

    return (
        <div>
            <SubTitle className="mb-6">{ticker}'s Price in {periods} Years</SubTitle>
            <div className="space-y-6">
                <p>
                    If {name} earns <Emphasis>{finalEps}</Emphasis> / share in {finalFiscalYear}, then it will be
                    worth&nbsp;
                    <Emphasis>{finalTvps}</Emphasis> at that time. If you hold the stock and sell at that price, you would earned <Emphasis>{simplePercent(irr)}</Emphasis> annual return
                </p>
                <Label>Computation:</Label>
                <pre>
                    {finalTvps} = {finalEps} x {finalPe}
                </pre>
                <p>
                    <Emphasis>{finalPe}</Emphasis> is how much investors would be willing to
                    pay for each dollar of earning in the year {finalFiscalYear}. It is the projected Price-to-Earnings (P/E) ratio
                </p>
                {fy0Eps > 0 ? <p>As a reference, the P/E ratio for {ticker} today is <Emphasis>{simpleNumber(fy0Pe)}</Emphasis></p> : null}
                <Label>Factors that Affect P/E:</Label>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Business risk</li>
                    <li>Market risk</li>
                    <li>Growth rate</li>
                </ol>
                <Label>In {ticker}'s Case:</Label>
                <ol className="list-decimal list-inside space-y-1">
                    <li>{businessRiskBullet}</li>
                    <li>We expect the stock market to return {simplePercent(equityRiskPremium)} on average</li>
                    <li>{growthRateBullet}</li>
                </ol>
            </div>
        </div>
    );
}
