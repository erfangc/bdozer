import React from 'react'
import {StockAnalysis2} from "../../../../client";
import {Label, SubTitle} from "../../../Common/Title";
import {year} from "../../../../year";
import {simpleMoney, simpleNumber, simplePercent} from "../../../../simple-number";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TerminalValueCalculation2({stockAnalysis}: Props) {

    const {name, ticker, derivedStockAnalytics, model, cells} = stockAnalysis
    const {discountRate, irr} = derivedStockAnalytics
    const {periods, epsConceptName, terminalGrowthRate} = model

    const finalFiscalYear = year(periods);
    const finalEps = simpleMoney(cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value)
    const finalTvps = simpleMoney(cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value)
    const finalPe = simpleNumber(1 / (discountRate - terminalGrowthRate))

    return (
        <div>
            <SubTitle className="mb-6">{ticker}'s Price in {periods} Years</SubTitle>
            <div className="space-y-6">
                <p>
                    If {name} earns <Emphasis>{finalEps}</Emphasis> / share in {finalFiscalYear}, then it will be
                    worth&nbsp;
                    <Emphasis>{finalTvps}</Emphasis> at that time. If you hold the stock and sell at that price, you would earned <Emphasis>{simplePercent(irr)}</Emphasis> annual return
                </p>
                <div className="space-y-4">
                    <Label>Computation:</Label>
                    <pre>
                        {finalTvps} = {finalEps} x {finalPe}
                    </pre>
                    <p>
                        <Emphasis>{finalPe}</Emphasis> is how much investors would be willing to
                        pay for each $1 in earnings per share in {finalFiscalYear}. It is the projected Price-to-Earnings (P/E) ratio
                    </p>
                </div>
                <div className="space-y-4">
                    <Label>{finalFiscalYear} Price-to-Earnings Ratio Computation:</Label>
                    <p>Factors that affect P/E ratio:</p>
                    <ol className="list-decimal list-inside">
                        <li>Business risk</li>
                        <li>Market risk</li>
                        <li>Growth rate</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

function Emphasis({
                      className,
                      children,
                      ...props
                  }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <b
            className={`text-lg font-bold ${className}`}
            {...props}
        >
            {children}
        </b>
    )
}