import React from "react";
import { StockAnalysis2 } from "../../../../client";
import { Number, Percent } from "../SmallCards";
interface Props {
    result: StockAnalysis2
}
export function DiscountFactorDerivation(props: Props) {
    const { result: { model, derivedStockAnalytics: { discountRate } } } = props
    const { beta } = model

    const fmtDiscountRate = `${(discountRate * 100).toFixed(1)}%`
    return (
        <div>
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
                        ?
                        <>
                            As compensation for the additional uncertainty, our model discounts future earnings at <b>{fmtDiscountRate}</b>. Giving you greater margin of safety
                        </>
                        :
                        <>
                            As compensation for the uncertainty, our model discounts future earnings at <b>${fmtDiscountRate}</b>
                        </>
                }
            </p>
            <p className="mt-4 mb-20 rounded-lg bg-blueGray-800 p-4">
                All else equal, higher discount rate results in more conservative target price
            </p>
        </div>
    )
}