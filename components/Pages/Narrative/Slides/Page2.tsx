import React from 'react'
import { StockAnalysis } from '../../../../client/api';
import { TerminalValuePerShare, EarningsPerShareBasic } from '../../../../constants';
import { year } from '../../../../year';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import { PageWrapper } from '../PageWrapper';
import { Statistic } from '../Statistic';

interface Props {
    result: StockAnalysis
}

export function Page2(props: Props) {
    const {
        model,
        model: { name, terminalGrowthRate },
        cells,
        discountRate,
    } = props.result;

    const terminalPe = (1 / (discountRate - terminalGrowthRate)).toFixed(1)
    const finalTvps = cells.find(cell => cell.item?.name === TerminalValuePerShare && cell.period == model.periods)?.value
    const eps = cells.find(cell => cell.item?.name === EarningsPerShareBasic && cell.period == 0)?.value
    const finalEps = cells.find(cell => cell.item?.name === EarningsPerShareBasic && cell.period == model.periods)?.value

    return (
        <PageWrapper id="page2">
            <div className="flex flex-col space-y-12 mt-20">
                <PageTitle>
                    How did we get the ${finalTvps.toFixed(1)} future price?
                    </PageTitle>
                <div className="space-y-6">
                    <Statistic
                        value={`$${eps.toFixed(1)}`}
                        label={`${year(0)} EPS`}
                    />
                    <Statistic
                        value={`$${finalEps.toFixed(1)}`}
                        label={`${year(model.periods)} EPS`}
                    />
                </div>
                <div className="max-w-2xl">
                    Normally, businesses like {name} trades at <span className="font-extrabold text-lg">{terminalPe}</span>x earnings per share
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
