import React from 'react'
import {StockAnalysis2} from '../../../../client/api';
import {year} from '../../../../year';
import {Navigation} from '../Navigation';
import {PageTitle} from '../PageTitle';
import {PageWrapper} from '../PageWrapper';
import {Statistic} from '../Statistic';

interface Props {
    result: StockAnalysis2
}

export function Page2(props: Props) {
    const {
        model,
        name,
        model: { terminalGrowthRate, epsConceptName, },
        cells,
        derivedStockAnalytics: {
            discountRate,
        },
    } = props.result;

    const terminalPe = (1 / (discountRate - terminalGrowthRate)).toFixed(1)
    const finalTvps = cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value
    const finalEps = cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value

    return (
        <PageWrapper id="page2">
            <div className="flex flex-col space-y-12 mt-20">
                <PageTitle>
                    How did we get the ${finalTvps.toFixed(1)} future price?
                    </PageTitle>
                <div className="grid grid-cols-2 gap-4">
                    <Statistic
                        value={`$${finalEps.toFixed(1)}`}
                        label={`${year(model.periods)} Earnings per Share (EPS)`}
                    />
                    <Statistic
                        value={`${terminalPe}x`}
                        label={`Estimated P/E Multiple`}
                    />
                </div>

                <div className="max-w-2xl">
                    Normally, businesses with similar risk as {name} trades at <span className="font-extrabold text-lg">{terminalPe}</span>x EPS
                </div>

                <div className="flex flex-col text-blueGray-200">
                    <div className="flex justify-between">
                        <b>{year(model.periods)} P/E Multiple</b>
                        <span className="font-light">{(1 / (discountRate - terminalGrowthRate)).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                        <b>{year(model.periods)} EPS</b>
                        <span className="font-light">x ${finalEps.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <b className="pt-2">Future Price</b>
                        <span className="border-t pt-2 font-bold ">${finalTvps.toFixed(1)}</span>
                    </div>
                </div>

                <Navigation prev="page1" next="page3" />
            </div>
        </PageWrapper>
    )
}
