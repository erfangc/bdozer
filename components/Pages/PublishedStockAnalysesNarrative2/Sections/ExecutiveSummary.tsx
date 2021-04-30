import React, {useEffect, useState} from "react";
import {RevenueModel, RevenueModelRevenueDriverTypeEnum, StockAnalysis2} from "../../../../client";
import {simpleMoney, simpleNumber} from "../../../../simple-number";
import {AnchorPopover} from "../../../Popover";
import {SubTitle} from "../../../Common/Title";
import {RevenueTimeSeries} from "./RevenueTimeSeries";
import {useRevenueModeler} from "../../../../api-hooks";

interface Props {
    stockAnalysis: StockAnalysis2
}
export function ExecutiveSummary(props: Props) {
    const {
        stockAnalysis,
        stockAnalysis: {
            cells,
            name,
            model: { periods, epsConceptName, },
            derivedStockAnalytics: {
                businessWaterfall,
                targetPrice,
                currentPrice,
                revenueCAGR,
            }
        }
    } = props;

    const stockAnalysisId = stockAnalysis['_id']
    const revenueModelerApi = useRevenueModeler()

    const [revenueModel, setRevenueModel] = useState<RevenueModel>()

    async function init() {
        const {data: revenueModel} = await revenueModelerApi.getRevenueModel(stockAnalysisId)
        setRevenueModel(revenueModel)
    }

    useEffect(() => {init()}, [])

    const { profit, expenses, revenue, } = businessWaterfall[0]

    const totalExpense = expenses.map(expense => expense.value).reduce((a, b) => a + b, 0)
    const eps = cells.find(cell => cell.item.name === epsConceptName && cell.period === 0)?.value

    return (
        <div>
            <SubTitle className="mb-6">Executive Summary</SubTitle>
            <div className="font-bold mt-8 mb-4">Current Business Situation</div>
            <ul className="list-disc pl-4 space-y-2">
                <li>
                    Last year, {name} made {simpleMoney(revenue.value)} revenue
                </li>
                <li>
                    They spend more than {simpleMoney(totalExpense)} with a {profit.value > 0 ? 'profit' : 'loss'} of {simpleMoney(profit.value)}
                </li>
                <li>
                    Investors {eps > 0 ? 'made' : 'lost'} {eps?.toFixed(1)} per share
                </li>
            </ul>
            <div className="font-bold mt-8 mb-4">Future Projections</div>
            <ul className="list-disc pl-4 space-y-2">
                <FutureProjectionTalkingPoint stockAnalysis={stockAnalysis} revenueModel={revenueModel}/>
            </ul>
        </div>
    )
}

interface FutureProjectionTalkingPointProps {
    stockAnalysis: StockAnalysis2
    revenueModel?: RevenueModel
}

function FutureProjectionTalkingPoint({revenueModel, stockAnalysis}: FutureProjectionTalkingPointProps) {
    const {
        name,
        model: { periods, },
        derivedStockAnalytics: {
            targetPrice,
            currentPrice,
            revenueCAGR,
        }
    } = stockAnalysis;
    const upside = (targetPrice / currentPrice - 1) * 100

    const growthRatePopover = (
        <AnchorPopover trigger={`${(revenueCAGR * 100).toFixed(1)}%`}>
            <RevenueTimeSeries result={stockAnalysis} />
        </AnchorPopover>
    )

    if (revenueModel?.revenueDriverType === RevenueModelRevenueDriverTypeEnum.AverageRevenuePerUserTimesActiveUser) {
        return (
            <>
                <li>
                    By <b>{revenueModel.terminalFiscalYear}</b>, we expect {name} to reach <b>{simpleNumber(revenueModel.terminalYearActiveUser)} </b>
                    active users making <b>{simpleMoney(revenueModel.terminalYearAverageRevenuePerUser)}</b> per user
                </li>
                <li>
                    As such, {name}'s fair value is {simpleMoney(targetPrice)}, which represents
                    <span className={`font-bold ${upside > 0 ? 'text-lime-400' : 'text-rose-500'}`}> {upside.toFixed(1)}% </span>
                    {upside > 0 ? 'upside' : 'downside'} from current price
                </li>
            </>
        )
    } else {
        return (
            <li>
                Based on Wall Street forecasts, the company will grow at {growthRatePopover} a year for the next {periods} years.
                That means {name} will be worth ${targetPrice.toFixed(1)}, which represents
                <span className={`font-bold ${upside > 0 ? 'text-lime-400' : 'text-rose-500'}`}> {upside.toFixed(1)}% </span>
                {upside > 0 ? 'upside' : 'downside'} from current price
            </li>
        );
    }

}