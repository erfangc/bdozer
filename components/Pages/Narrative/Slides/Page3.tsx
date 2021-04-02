import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { StockAnalysis } from '../../../../client';
import { EarningsPerShareBasic, WeightedAverageNumberOfSharesOutstandingBasic } from '../../../../constants';
import { highcharts } from '../../../../highcharts';
import { simpleNumber } from '../../../../simple-number';
import { year } from '../../../../year';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import { PageWrapper } from '../PageWrapper';
import { baseOptions, waterfallSeries } from '../waterfall-series';

interface Props {
    result: StockAnalysis
}

export function Page3(props: Props) {
    const {
        model,
        model: { symbol, },
        cells,
        businessWaterfall,
    } = props.result

    const finalEps = cells.find(cell => cell.item?.name === EarningsPerShareBasic && cell.period == model.periods)?.value

    const fyFinalWaterFall = {
        ...baseOptions,
        series: waterfallSeries(businessWaterfall[model.periods])
    }
    const profit = businessWaterfall[model.periods]?.profit?.value;
    const sharesOutstanding = cells.find(cell => cell.period == model.periods && cell.item?.name === WeightedAverageNumberOfSharesOutstandingBasic)?.value

    return (
        <PageWrapper id="page3">
            <div className="flex flex-col space-y-12 mt-20 w-full">
                <PageTitle>
                    In {year(model.periods)}, why would earnings be ${finalEps.toFixed(1)} per share?
                </PageTitle>
                <div className="w-full">
                    <p>
                        <span>{symbol}'s profit is projected to be </span>
                        <span className={`${profit > 0 ? 'text-lime-500' : 'text-rose-500'} font-extrabold text-lg`}>
                            ${simpleNumber(profit?.toFixed(0))}
                        </span>
                    </p>
                    <HighchartsReact highcharts={highcharts} options={fyFinalWaterFall} />
                </div>
                <div className="flex flex-col text-blueGray-200">
                    <div className="flex justify-between">
                        <b>{year(model.periods)} Profit</b>
                        <span className="font-light">${simpleNumber(profit?.toFixed(0))}</span>
                    </div>
                    <div className="flex justify-between">
                        <b>Shares Outstanding</b>
                        <span className="font-light">{simpleNumber(sharesOutstanding?.toFixed(0))}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <b className="pt-2">
                            Earning per Share
                                <code className="block text-xs font-normal mt-2 mb-4"> = {year(model.periods)} Profit &#247;  Shares Outstanding</code>
                        </b>
                        <span className="border-t pt-2 font-bold ">$4.1</span>
                    </div>
                </div>
                <Navigation next="page4" prev="page2" />
            </div>
        </PageWrapper>
    )
}
