import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Model, ModelBuilderControllerApi, ModelEvaluationOutput, ModelsControllerApi } from '../../client';
import { BalanceSheetEditor } from './BalanceSheetEditor/BalanceSheetEditor';
import { Billboard } from './Billboard';
import { IncomeStatementEditor } from './IncomeStatementEditor/IncomeStatementEditor';

const modelBuilderApi = new ModelBuilderControllerApi()
const modelsApi = new ModelsControllerApi()

export function ModelEditor() {

    const [model, setModel] = useState<Model | undefined>()
    const [output, setOutput] = useState<ModelEvaluationOutput | undefined>()
    const [activeTab, setActiveTab] = useState<'income statement' | 'balance sheet'>('income statement')

    // load the model from the backend
    useEffect(() => {
        (async () => {
            const { data: model } = await modelsApi._default()
            setModel(model)
            const { data: output } = await modelBuilderApi.evaluateModel(model)
            setOutput(output)
        })()
    }, [])

    /**
     * Function to handle updating / reformulating the model
     * @param newModel 
     */
    async function updateModel(newModel: Model) {
        setModel(newModel)
        // reformulate the model via the back-end
        try {
            const { data: reformulatedModel } = await modelBuilderApi.reformulateModel(newModel)
            setModel(reformulatedModel)
            const { data } = await modelBuilderApi.evaluateModel(reformulatedModel)
            setOutput(data)
        } catch (e) {
            console.error(e)
        }

    }

    if (model === undefined) {
        return null
    }

    return (
        <div className="text-blueGray-100 text-lg container mx-auto pt-24 pb-96 lg:flex">
            <div className="flex-col space-y-16">
                <div className="flex space-x-4">
                    <Card value={output?.targetPriceUnderExitMultipleMethod} label="Price (xMultiple)" />
                    <Card value={output?.targetPriceUnderPerpetuityMethod} label="Price (Growing Perpetuity)" />
                </div>
                <div className="flex-col space-y-8">
                    <Tabs activeTab={activeTab} onChange={newValue => setActiveTab(newValue)} />
                    {
                        activeTab === 'income statement'
                            ? <IncomeStatementEditor model={model} onChange={updateModel} />
                            : <BalanceSheetEditor model={model} onChange={updateModel} />
                    }
                </div>
            </div>
            <Billboard />
        </div>
    )
}

// Card component
interface CardProps {
    label: any
    value: number
}
function Card(props: CardProps) {
    return (
        <div className="py-4 px-8 rounded-lg shadow-md bg-blueGray-700 flex-col flex space-y-2">
            <span className="text-xs">{props.label}</span>
            <NumberFormat
                displayType='text'
                className="text-2xl"
                value={props.value}
                decimalScale={1}
                prefix="$"
            />
        </div>
    )
}
// end

interface TabsProps {
    activeTab: 'income statement' | 'balance sheet'
    onChange: (newTab: 'income statement' | 'balance sheet') => void
}

function Tabs({ activeTab, onChange }: TabsProps) {

    const activeClass = "border-b-4 border-blue-500 text-lg text-blueGray-50 pb-2 transition ease-linear hover:border-blue-200 focus:outline-none"
    const inactiveClass = "border-b-4 border-blueGray-900 text-lg text-blueGray-400 pb-2 transition ease-linear hover:border-blue-500 hover:text-blueGray-50 focus:outline-none"

    return (
        <div className="flex space-x-4">
            <button className={activeTab === 'income statement' ? activeClass : inactiveClass} onClick={() => onChange('income statement')}>
                Income Statement
            </button>
            <button className={activeTab === 'balance sheet' ? activeClass : inactiveClass} onClick={() => onChange('balance sheet')}>
                Balance Sheet
            </button>
        </div>
    )

}
