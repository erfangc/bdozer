import { Model, ModelEvaluationOutput } from "../../client";

import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import { CostOfGoodsSold, FreeCashFlow, GrossProfit, NetIncome, Revenue } from "../../constants/ReservedItemNames";
import { Card } from "../Card";
import { highcharts } from "../../highcharts";
import { GhostButton } from "../GhostButton";

interface OutputDashProps {
    output: ModelEvaluationOutput
    model: Model
}

export function OutputDash({ model, output }: OutputDashProps) {

    const revenue = filterFor(Revenue)
    const cogs = filterFor(CostOfGoodsSold)
    const grossProfit = filterFor(GrossProfit)
    const netIncome = filterFor(NetIncome)
    const fcf = filterFor(FreeCashFlow)

    const stacking = 'normal'
    const type = 'column'

    const options: Highcharts.Options = {
        title: {
            text: 'Projected Financials Overtime'
        },
        yAxis: {
            title: {
                text: null
            },
        },
        xAxis: {
            title: {
                text: 'Years'
            },
        },
        series: [
            {
                name: 'Revenue',
                type,
                stacking,
                data: revenue
            },
            {
                name: 'COGS',
                type,
                stacking,
                data: cogs
            },
            {
                name: 'Gross Profit',
                type,
                stacking,
                data: grossProfit
            },
            {
                name: 'Net Income',
                type,
                stacking: undefined,
                data: netIncome
            },
            {
                name: 'Free Cash Flow',
                type,
                stacking: undefined,
                data: fcf
            }
        ],
    }

    return (
        <div className='flex-col px-10 items-center flex-grow justify-center space-y-10'>
            <div className="flex justify-between">
                <div className="flex space-x-4">
                    <Card
                        value={output?.targetPriceUnderExitMultipleMethod}
                        label="Price (Multiple)"
                    />
                    <Card
                        value={output?.targetPriceUnderPerpetuityMethod}
                        label="Price (Growing Perpetuity)"
                    />
                </div>
                <GhostButton>Model Settings</GhostButton>
            </div>
            <figure className="w-full">
                <HighchartsReact
                    highcharts={highcharts}
                    options={options}
                />
            </figure>
        </div>
    )

    function filterFor(itemName: string) {
        return output
            ?.cells
            ?.filter(cell => cell.item?.name === itemName)
            ?.map(cell => [new Date().getFullYear() + cell.period, cell.value]) ?? [];
    }

}