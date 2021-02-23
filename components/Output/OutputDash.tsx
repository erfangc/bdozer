import { Item, Model, ModelEvaluationOutput } from "../../client";

import React, { useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import { Card } from "../Card";
import { highcharts } from "../../highcharts";
import { GhostButton, SmallGhostButton } from "../GhostButton";

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
                <GhostButton>Model Settings</GhostButton>
            </div>
            <figure>
                <div className="flex space-x-6 mb-2">
                    <div className="flex-col space-y-1">
                        <p className="text-sm">Stack Behavior:</p>
                        <div className="flex space-x-1">
                            <SmallGhostButton onClick={() => setStacking(undefined)}>No Stacking</SmallGhostButton>
                            <SmallGhostButton onClick={() => setStacking('normal')}>Stack</SmallGhostButton>
                            <SmallGhostButton onClick={() => setStacking('percent')}>As Percentage</SmallGhostButton>
                        </div>
                    </div>
                    <div className="flex-col space-y-1">
                        <p className="text-sm">Chart Type:</p>
                        <div className="flex space-x-1">
                            <SmallGhostButton onClick={() => setType('area')} >Area</SmallGhostButton>
                            <SmallGhostButton onClick={() => setType('column')} >Column</SmallGhostButton>
                            <SmallGhostButton onClick={() => setType('line')} >Line</SmallGhostButton>
                        </div>
                    </div>
                    <ItemChooser
                        chosenItems={chosenItems}
                        model={model}
                        onChange={newChosenItems => setChosenItems(newChosenItems)}
                    />
                </div>
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

interface ItemChooserProps {
    chosenItems: Item[]
    model: Model
    onChange: (chosenItems: Item[]) => void
}

function ItemChooser(
    {
        chosenItems,
        model: {
            incomeStatementItems,
            otherItems
        },
        onChange
    }: ItemChooserProps) {
    const [open, setOpen] = useState(false)

    function select(item: Item) {
        let newChosenItems = null
        if (chosenItems.includes(item)) {
            newChosenItems = chosenItems.filter(i => i.name !== item.name)
        } else {
            newChosenItems = [...chosenItems, item]
        }
        onChange(newChosenItems)
    }

    return (
        <div className="relative self-end flex" style={{ zIndex: 9 }}>
            <SmallGhostButton onClick={() => setOpen(!open)}>
                Items to Display
            </SmallGhostButton>
            {
                open
                    ?
                    <div className="p-6 bg-blueGray-700 rounded-lg shadow-lg mt-2 inline-block absolute top-full -left-1/2 whitespace-nowrap">
                        <p className="text-sm font-bold block mb-4 border-b border-blueGray-400">
                            Income Statement
                        </p>
                        {
                            incomeStatementItems.map(item =>
                                <div key={item.name} className="text-sm mb-1">
                                    <input
                                        type="checkbox"
                                        name={item.name}
                                        checked={chosenItems.includes(item)}
                                        onChange={() => select(item)}
                                    />
                                    <label className="ml-2">{item.description ?? item.name}</label>
                                </div>
                            )
                        }
                        <p className="text-sm font-bold block mt-6 mb-4 border-b border-blueGray-400">
                            Other Items
                        </p>
                        {
                            otherItems.map(item =>
                                <div key={item.name} className="text-sm mb-1">
                                    <input
                                        type="checkbox"
                                        name={item.name}
                                        checked={chosenItems.includes(item)}
                                        onChange={() => select(item)}
                                    />
                                    <label className="ml-2">{item.description ?? item.name}</label>
                                </div>
                            )
                        }
                    </div>
                    :
                    null
            }
        </div>

    )
}