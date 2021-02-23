import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';
import { Item, Model, ModelEvaluationOutput } from "../../client";
import { highcharts } from "../../highcharts";
import { Card } from "../Card";
import { GhostButton } from "../GhostButton";
import { Toolbar } from "./Toolbar";
import Modal from 'react-modal';
import { AutoForm, Schema } from '../AutoForms/AutoForm';
import { DeleteButton } from '../DeleteButton';

interface OutputDashProps {
    output: ModelEvaluationOutput
    model: Model
    onChange: (newModel: Model) => void
}

export function OutputDash({ model, output, onChange }: OutputDashProps) {

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
                <ModelSettingsModal model={model} onChange={onChange} />
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
interface ModelSettingsModalProps {
    model: Model
    onChange: (newModel: Model) => void
}
function ModelSettingsModal({ model, onChange }: ModelSettingsModalProps) {
    const [open, setOpen] = useState(false)

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(newModel: Model) {
        onChange(newModel)
        closeModal()
    }

    return (
        <div>
            <GhostButton onClick={openModal}>
                Model Settings
            </GhostButton>
            <Modal
                overlayClassName="z-10"
                shouldCloseOnOverlayClick
                className="z-10 top-1/4 left-1/4 right-1/4 absolute p-10 overflow-auto rounded-lg outline-none bg-blueGray-700 text-blueGray-50"
                isOpen={open}
                onRequestClose={closeModal}
            >
                <h1 className="text-2xl font-bold">Model Settings</h1>
                <p className="text-sm mt-2 mb-12 font-light">Configure settings for discount rates, beta, corporate tax rate and other common inputs into an equity valuation model</p>

                <AutoForm body={model} schema={schema} onSubmit={handleSubmit} useGrid />
                <DeleteButton onClick={closeModal} className="mt-2">Close</DeleteButton>
            </Modal>
        </div>
    )
}

const schema: Schema[] = [
    {
        name: "currentPrice",
        type: "number",
        label: "Current Price"
    },
    {
        name: "beta",
        type: "number",
        label: "Beta"
    },
    {
        name: "sharesOutstanding",
        type: "number",
        label: "Shares Outstanding"
    },
    {
        name: "dilutedSharesOutstanding",
        type: "number",
        label: "Diluted Shares Outstanding"
    },
    {
        name: "corporateTaxRate",
        type: "percent",
        label: "Corporate Tax Rate %"
    },
    {
        name: "costOfDebt",
        type: "percent",
        label: "Cost Of Debt %"
    },
    {
        name: "riskFreeRate",
        type: "percent",
        label: "Risk Free Rate %"
    },
    {
        name: "equityRiskPremium",
        type: "percent",
        label: "Equity Risk Premium %"
    },
    {
        name: "terminalFcfMultiple",
        type: "number",
        label: "Terminal FCF Multiple"
    },
    {
        name: "terminalFcfGrowthRate",
        type: "percent",
        label: "Terminal FCF Growth Rate %"
    },
    {
        name: "periods",
        type: "integer",
        label: "Projection Periods"
    }
]