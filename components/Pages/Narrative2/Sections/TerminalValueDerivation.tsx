import React from 'react'
import { StockAnalysis } from '../../../../client'
import { year } from '../../../../year'
import { Popover } from '../../../Popover'
import { SubTitle } from '../../../Common/Title'
interface Props {
    result: StockAnalysis
}
export function TerminalValueDerivation(props: Props) {
    const { result: { cells, model, discountRate, epsConceptName } } = props
    const { terminalGrowthRate, periods, name, } = model

    const finalEps = cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value
    const finalTvps = cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value

    return (

        <div>
            <SubTitle className="mt-8 mb-4">Terminal Value Calculation</SubTitle>
            <p className="mb-4">
                After {year(periods)}, we assumed {name} earnings will grow at {(terminalGrowthRate * 100).toFixed(1)}%, the average US GDP growth rate.
                If you held the stock until {year(periods)}, we expect you can sell it for <b>${finalTvps.toFixed(1)} / share</b><br />
                <br />
                <Popover trigger={`How did we compute $${finalTvps.toFixed(1)}?`}>
                    <div className="flex flex-col text-blueGray-300">
                        <div className="flex justify-between">
                            <b>Discount Rate</b>
                            <span className="font-light">{(discountRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <b>Long-term Earnings Growth Rate</b>
                            <span className="font-light"> {(terminalGrowthRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <b className="">{year(periods)} EPS</b>
                            <span className="font-light">${finalEps.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                            <b className="">{year(periods)} P/E Multiple  <code className="block text-xs font-normal mt-2 mb-4"> = 1 / (Discount Rate - Longterm Growth)</code></b>
                            <span className="font-light">{(1 / (discountRate - terminalGrowthRate)).toFixed(1)} x</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <b className="pt-2">Terminal Value per Share <code className="block text-xs font-normal mt-2 mb-4"> = {year(periods)} EPS * {year(periods)} P/E Multiple</code></b>
                            <span className="border-t pt-2 font-bold ">${finalTvps.toFixed(1)}</span>
                        </div>
                    </div>
                </Popover>
            </p>
        </div >
    )
}