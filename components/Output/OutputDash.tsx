import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';
import { Item, Model, ModelEvaluationOutput } from "../../client";
import { FreeCashFlow, NetIncome, Revenue } from '../../constants/ReservedItemNames';
import { highcharts } from "../../highcharts";
import { Card } from "../Card";
import { PrimaryButton } from '../PrimaryButton';
import { ModelSettings } from './ModelSettings';
import { Toolbar } from "./Toolbar";
import Modal from 'react-modal';
import { GhostButton } from '../GhostButton';
import { DeleteButton } from '../DeleteButton';

interface OutputDashProps {
    output: ModelEvaluationOutput
    model: Model
    onChange: (newModel: Model) => void
}

export function OutputDash({ model, output, onChange }: OutputDashProps) {

    const [stacking, setStacking] = useState<'normal' | 'percent' | undefined>()
    const [type, setType] = useState<'area' | 'column' | 'line'>("column")

    const [chosenItems, setChosenItems] = useState<Item[]>([
        model.incomeStatementItems.find(it => it.name === Revenue),
        model.incomeStatementItems.find(it => it.name === NetIncome),
        model.otherItems.find(it => it.name === FreeCashFlow),
    ])

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
        <div className='flex-col px-24 items-center flex-grow justify-center space-y-20'>
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
                <div className="flex-col space-y-1">
                    <ModelSettings model={model} onChange={onChange} />
                    <SaveAs />
                </div>
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

function SaveAs() {
    const [open, setOpen] = useState(false)

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(newModel: Model) {
        closeModal()
    }

    return (
        <div>
            <PrimaryButton onClick={openModal} className="w-full">Save As</PrimaryButton>
            <Modal
                overlayClassName="z-10"
                shouldCloseOnOverlayClick
                className="z-10 top-1/4 left-1/4 right-1/4 absolute p-10 overflow-auto rounded-lg outline-none bg-blueGray-700 text-blueGray-50"
                isOpen={open}
                onRequestClose={closeModal}
            >
                <h1 className="text-2xl font-bold">Save As</h1>
                <p className="text-sm mt-2 mb-12 font-light">
                    This feature is not available right now
                </p>
                <DeleteButton onClick={closeModal}>Dismiss</DeleteButton>
            </Modal>
        </div>
    )
}