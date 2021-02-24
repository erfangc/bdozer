import React, { useEffect, useState } from 'react';
import { Model, ModelBuilderControllerApi, ModelEvaluationOutput, ModelsControllerApi } from '../../client';
import { OutputDash } from '../Output/OutputDash';
import { BalanceSheetEditor } from './BalanceSheetEditor/BalanceSheetEditor';
import { Billboard } from './Billboard';
import { IncomeStatementEditor } from './IncomeStatementEditor/IncomeStatementEditor';

const modelBuilderApi = new ModelBuilderControllerApi()
const modelsApi = new ModelsControllerApi()

export function ModelEditor() {

    const [model, setModel] = useState<Model | undefined>()
    const [output, setOutput] = useState<ModelEvaluationOutput | undefined>()
    const [activeTab, setActiveTab] = useState<'income statement' | 'balance sheet'>('income statement')

    //
    // load the model from the backend
    //
    useEffect(() => {
        (async () => {
            //
            // determine which model to pull down
            //
            const { data: model } = await modelsApi._default()
            setModel(model)
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

    function runModel() {
        updateModel(model)
    }

    if (model === undefined) {
        return null
    }

    return (
        <div className="text-blueGray-100 text-lg container mx-auto pt-24 pb-96 lg:flex">
            <div className="flex-col space-y-16">
                <div className="flex-col space-y-8">
                    <Tabs activeTab={activeTab} onChange={newValue => setActiveTab(newValue)} />
                    {
                        activeTab === 'income statement'
                            ? <IncomeStatementEditor model={model} onChange={updateModel} />
                            : <BalanceSheetEditor model={model} onChange={updateModel} />
                    }
                </div>
            </div>
            {
                output
                    ? <OutputDash model={model} output={output} onChange={updateModel} />
                    : <Billboard runModel={runModel} />
            }
        </div>
    )
}

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
