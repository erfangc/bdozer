import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';
import { Item, Model, ModelEvaluationOutput } from "../../client";
import { highcharts } from "../../highcharts";
import { Card } from "../Card";
import { GhostButton } from "../GhostButton";
import { Toolbar } from "./Toolbar";

interface OutputDashProps {
    output: ModelEvaluationOutput
    model: Model
}

export function OutputDash({ model, output }: OutputDashProps) {

    const [stacking, setStacking] = useState<'normal' | 'percent' | undefined>()
    const [type, setType] = useState<'area' | 'column' | 'line'>("column")

    const [chosenItems, setChosenItems] = useState<Item[]>([])

    const series = chosenItems.map(item => ({
        name: item.description ?? item.name,
        type,
        stacking,
        data: filterFor(item.name)
    }))

    const options: Highcharts.Options = {
        title: {
            text: null
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
        series,
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
                <GhostButton>
                    Model Settings
                </GhostButton>
            </div>
            <figure>
                <Toolbar
                    chosenItems={chosenItems}
                    model={model}
                    setStacking={setStacking}
                    setType={setType}
                    setChosenItems={setChosenItems}
                />
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
            ?.map(cell => [new Date().getFullYear() + cell.period - 1, cell.value]) ?? [];
    }

}
