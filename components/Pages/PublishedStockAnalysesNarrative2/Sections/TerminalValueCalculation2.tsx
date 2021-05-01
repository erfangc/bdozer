import React from 'react'
import {StockAnalysis2} from "../../../../client";
import {Label, SubTitle} from "../../../Common/Title";
import {year} from "../../../../year";
import {simpleMoney, simpleNumber} from "../../../../simple-number";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TerminalValueCalculation2({stockAnalysis}: Props) {
    const {name, ticker, derivedStockAnalytics, model, cells} = stockAnalysis
    const {discountRate} = derivedStockAnalytics
    const {periods, epsConceptName, terminalGrowthRate} = model
    const finalEps = simpleMoney(cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value)
    const finalTvps = simpleMoney(cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value)
    const finalFiscalYear = year(periods);
    const finalPe = simpleNumber(1 / (discountRate - terminalGrowthRate))
    return (
        <div>
            <SubTitle className="mt-8 mb-4">{ticker}'s Price in {periods} Years</SubTitle>
            <div className="space-y-4">
                <p>
                    If {name} earns <Emphasis>{finalEps}</Emphasis> / share in {finalFiscalYear}, then it will be
                    worth&nbsp;
                    <Emphasis>{finalTvps}</Emphasis> at that time
                </p>
                <Label>Computation:</Label>
                <pre>
                    {finalTvps} = {finalEps} x {finalPe}
                </pre>
                <p>
                    <Emphasis>{finalPe}</Emphasis> is the amount investors would be willing to
                    pay per $1 in EPS in {finalFiscalYear} <br/>
                    This is the projected Price-to-Earnings ratio
                </p>
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