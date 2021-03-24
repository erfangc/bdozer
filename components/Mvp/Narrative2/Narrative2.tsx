import React from "react";
import { ModelResult } from "../../../client";
import { simpleNumber } from "../../../simple-number";
import { SubTitle } from "../../Title";
import { Money, Percent, Number } from "./Card";
import { EarningsPerShare } from "./EarningsPerShare";
import { FutureEarningsPerShare } from "./FutureEarningsPerShare";
import { ProfitWaterFall } from "./ProfitWaterFall";
import { ValueBreakdown } from "./ValueBreakdown";

interface Props {
    result: ModelResult
}

export function Narrative2(props: Props) {
    const {
        result,
        result: {
            cells,
            model: {
                description,
                symbol,
                beta,
                equityRiskPremium,
                riskFreeRate,
            },
            currentPrice,
            targetPrice,
            discountRate,
        }
    } = props;

    return (
        <main className="text-blueGray-50 flex-grow min-h-screen px-2 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg flex-col space-y-16">
                <div>
                    <span className="font-extralight">Company</span><SubTitle>{symbol}</SubTitle>
                    <div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <Money title="Target Price" value={targetPrice} />
                        <Money title="Current Price" value={currentPrice} />
                    </div>
                </div>
                <div>
                    <SubTitle className="mb-6">Value Breakdown</SubTitle>
                    <ValueBreakdown result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Business Breakdown</SubTitle>
                    <ProfitWaterFall result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Earning Per Share</SubTitle>
                    <EarningsPerShare result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Future Earnings per Share</SubTitle>
                    <FutureEarningsPerShare result={result} />
                </div>
                <div>
                    <SubTitle className="mb-6">Present Value</SubTitle>
                    <p>How much profit will be generated in the future?</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <Percent title="Discount Rate" value={discountRate} />
                        <Number title="Beta" value={beta} />
                    </div>
                </div>
            </div>
        </main>
    )
}
