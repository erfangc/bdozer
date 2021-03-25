import React from 'react'
import { StockAnalysis } from '../../../../client'
import { EarningsPerShareDiluted, TerminalValuePerShare } from '../../../../constants/ReservedItemNames'
import { year } from '../../../../year'
import { Label, SubTitle } from '../../../Title'
import { Number, Percent } from '../Card'
interface Props {
    result: StockAnalysis
}
export function TerminalValueDerivation(props: Props) {
    const { result: { cells, model, discountRate } } = props
    const { beta, terminalGrowthRate, periods } = model

    const fmtDiscountRate = `${(discountRate * 100).toFixed(1)}%`
    const finalEps = cells.find(cell => cell.item?.name === EarningsPerShareDiluted && cell.period == model.periods)?.value
    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value

    return (
        <div>
            <SubTitle>Discount Future Earnings</SubTitle>
            <div className="mt-4 grid grid-cols-2 gap-2">
                <Percent title="Discount Rate" value={discountRate} />
                <Number title="Beta" value={beta} />
            </div>
            <p className="mt-4">
                This stock is <b>{beta.toFixed(2)}x</b> {beta > 1 ? 'more' : 'as'} volatile {beta > 1 ? 'than' : 'as'} the general stock market
            </p>
            <p className="mt-4">
                {
                    beta > 1
                        ? <>As compensation for the additional uncertainty, our model discounts future earnings at <b>{fmtDiscountRate}</b>.
                            Giving you greater margin of safety</>
                        : <>As compensation for the uncertainty, our model discounts future earnings at <b>${fmtDiscountRate}</b></>
                }
            </p>
            <p className="mt-4 mb-20 rounded-lg bg-blueGray-800 p-4">
                All else equal, higher discount rate results in more conservative target price
            </p>
            <SubTitle className="mb-6">Terminal Value Computation</SubTitle>
            <p className="mb-4">
                Our earnings projection end on year <b>{year(periods)}</b>. If you held the stock until <b>{year(periods)}</b>, we
                assume you can sell it for <b>${finalTvps.toFixed(1)}</b> / share
            </p>
            <p className="mb-4">

            </p>
            {/* Breakdown terminal value calculation */}
            <Label className="mt-8 mb-4">Terminal Value Calculation</Label>
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
        </div >
    )
}