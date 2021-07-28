import React, {useEffect, useState} from "react";
import {RevenueModel, RevenueModelRevenueDriverTypeEnum, StockAnalysis2} from "../../../../client";
import {readableMoney, readableNumber, readablePercent} from "../../../../number-formatters";
import {AnchorPopover} from "../../../Popover";
import {SubTitle} from "../../../Common/Title";
import {RevenueTimeSeries} from "./RevenueTimeSeries";
import {useRevenueModeler} from "../../../../api-hooks";

interface Props {
    stockAnalysis: StockAnalysis2
}
export function Summary(props: Props) {
    const {
        stockAnalysis,
        stockAnalysis: {
            cells,
            name,
            model: { epsConceptName, },
            derivedStockAnalytics: {
                businessWaterfall,
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
        <section id="summary">
            <SubTitle className="mb-6">Summary</SubTitle>
            <div className="text-lg text-blueGray-400 font-bold mt-8 mb-2">Current Business Situation</div>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    Last year, {name} made {readableMoney(revenue.value)} revenue
                </li>
                <li>
                    The company spent {readableMoney(totalExpense)}, leading to {readableMoney(profit.value)} in {profit.value > 0 ? 'profit' : 'losses'}
                </li>
                <li>
                    As a result, investors {eps > 0 ? 'made' : 'lost'} <b>{readableMoney(eps)}</b> per share
                </li>
            </ul>
            <div className="text-lg text-blueGray-400 font-bold mt-8 mb-2">Future Projections</div>
            <ul className="list-disc list-inside space-y-2">
                <FutureProjectionTalkingPoint stockAnalysis={stockAnalysis} revenueModel={revenueModel}/>
            </ul>
        </section>
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

    if (revenueModel?.revenueDriverType === RevenueModelRevenueDriverTypeEnum.AverageRevenuePerUserTimesActiveUser) {
        return (
            <>
                <li>
                    By <b>{revenueModel.terminalFiscalYear}</b>, forecast expect {name} to reach <b>{readableNumber(revenueModel.terminalYearActiveUser)} </b>
                    active users, earning <b>{readableMoney(revenueModel.terminalYearAverageRevenuePerUser)}</b> on average per user
                </li>
                <li>
                    As such, {name}'s fair value is {readableMoney(targetPrice)}, which represents
                    <span className={`font-bold ${upside > 0 ? 'text-lime-400' : 'text-rose-500'}`}> {upside.toFixed(1)}% </span>
                    {upside > 0 ? 'upside' : 'downside'} from current price
                </li>
            </>
        )
    } else {
        return (
            <>
                <li>
                    Based on Wall Street forecasts, the company will grow {readablePercent(revenueCAGR)}% a year for the next {periods} years
                </li>
                <li>
                    Given this, {name}'s value fair today is {readableMoney(targetPrice)}, which represents
                    <span className={`font-bold ${upside > 0 ? 'text-lime-400' : 'text-rose-500'}`}> {upside.toFixed(1)}% </span>
                    {upside > 0 ? 'upside' : 'downside'} from current price
                </li>
            </>
        );
    }

}