import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { StockAnalysis2 } from '../../../../client';
import { highcharts } from '../../../../highcharts';
import { simpleNumber } from '../../../../simple-number';
import { year } from '../../../../year';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import { PageWrapper } from '../PageWrapper';
import { baseOptions, waterfallSeries } from '../waterfall-series';

interface Props {
    result: StockAnalysis2
}

export function Page3(props: Props) {
    const {
        model,
        ticker,
        model: { epsConceptName, sharesOutstandingConceptName, },
        cells,
        derivedStockAnalytics: {
            businessWaterfall,
        },
    } = props.result

    const finalEps = cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value

    const fyFinalWaterFall = {
        ...baseOptions,
        series: waterfallSeries(businessWaterfall[model.periods])
    }
    const profit = businessWaterfall[model.periods]?.profit?.value;
    const eps = cells.find(cell => cell.item?.name === epsConceptName && cell.period == model.periods)?.value
    const sharesOutstanding = cells.find(cell => cell.period == model.periods && cell.item?.name === sharesOutstandingConceptName)?.value

    const finalYear = year(model.periods);
    return (
        <PageWrapper id="page3">
            <div className="flex flex-col space-y-12 mt-20 w-full">
                <PageTitle>In {finalYear}, why would earnings be ${finalEps.toFixed(1)} per share?</PageTitle>
                <div className="w-full">
                    <p>
                        <span>{ticker}'s profit is projected to be </span>
                        <span className={`${profit > 0 ? 'text-lime-500' : 'text-rose-500'} font-extrabold text-lg`}>
                            ${simpleNumber(profit?.toFixed(0))}
                        </span>
                        <span> in {finalYear}, see details below</span>
                    </p>
                    <HighchartsReact highcharts={highcharts} options={fyFinalWaterFall} />
                </div>
                <div className="flex flex-col text-blueGray-200">
                    <div className="flex justify-between">
                        <b>{finalYear} Profit</b>
                        <span className="font-light">${simpleNumber(profit?.toFixed(0))}</span>
                    </div>
                    <div className="flex justify-between">
                        <b>Shares Outstanding</b>
                        <span className="font-light">&#247; {simpleNumber(sharesOutstanding?.toFixed(0))}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <b className="pt-2">Earning per Share</b>
                        <span className="border-t pt-2 font-bold ">${eps.toFixed(1)}</span>
                    </div>
                </div>
                <Navigation next="page4" prev="page2" />
            </div>
        </PageWrapper>
    )
}
