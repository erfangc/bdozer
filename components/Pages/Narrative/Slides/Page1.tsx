import React from 'react'
import { StockAnalysis2 } from '../../../../client';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import { PageWrapper } from '../PageWrapper';
import { Statistic } from '../Statistic';
interface Props {
    result: StockAnalysis2
}
export function Page1(props: Props) {
    const {
        name,
        model,
        cells,
        derivedStockAnalytics: {
            currentPrice
        }
    } = props.result;

    const finalTvps = cells.find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == model.periods)?.value
    const upside = ((finalTvps / currentPrice) - 1) * 100

    return (
        <PageWrapper id="page1">
            <div className="flex flex-col space-y-12 mt-20">
                <PageTitle>
                    What's <br />{name} stock worth?
                </PageTitle>
                <div className="space-y-6">
                    <Statistic label="Current Price" value={`$${currentPrice.toFixed(2)}`} />
                    <Statistic label={`Estimated Price in ${model.periods - 1} Years`} value={`$${finalTvps.toFixed(2)}`} />
                    <Statistic
                        label={`% ${upside > 0 ? 'Upside' : 'Downside'}`}
                        value={<div className={`${upside > 0 ? 'text-lime-500' : 'text-rose-500'} font-extrabold text-2xl`}>{upside.toFixed(1)}%</div>}
                    />
                </div>
                <Navigation next="page2" />
            </div>
        </PageWrapper >
    )
}
