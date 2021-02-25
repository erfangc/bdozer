import React, { useEffect, useState } from 'react';
import { useModelBuilderApi, useModelsApi } from '../../ApiClientsHooks';
import { Model, ModelEvaluationOutput } from '../../client';
import { OutputDash } from '../Output/OutputDash';
import { BalanceSheetEditor } from './BalanceSheetEditor/BalanceSheetEditor';
import { Billboard } from './Billboard/Billboard';
import { IncomeStatementEditor } from './IncomeStatementEditor/IncomeStatementEditor';
import { ModelEditorSkeleton } from './ModelEditorSkeleton';

interface ModelEditorProps {
    _id?: string
}

export function ModelEditor(props: ModelEditorProps) {

    const [model, setModel] = useState<Model | undefined>()
    const [loadingModel, setLoadingModel] = useState(false)
    const [runningModel, setRunningModel] = useState(false)
    const [output, setOutput] = useState<ModelEvaluationOutput | undefined>()
    const [activeTab, setActiveTab] = useState<'income statement' | 'balance sheet'>('income statement')

    const modelsApi = useModelsApi()
    const modelBuilderApi = useModelBuilderApi()

    //
    // load the model from the backend
    //
    useEffect(() => {
        setLoadingModel(true);
        (async () => {
            if (props._id !== 'sample') {
                const { data: model } = await modelsApi.getModel(props._id)
                setModel(model)
            } else {
                const { data: model } = await modelsApi.sample()
                setModel(model)
            }
            setLoadingModel(false);
        })()
    }, [])

    /**
     * Function to handle updating / reformulating the model
     * @param newModel 
     */
    async function updateModel(newModel: Model) {
        setModel(newModel)
        setRunningModel(true)
        // reformulate the model via the back-end
        try {
            const { data: reformulatedModel } = await modelBuilderApi.reformulateModel(newModel)
            setModel(reformulatedModel)
            modelsApi.saveModel(reformulatedModel) // save in the background don't wait
            const { data } = await modelBuilderApi.evaluateModel(reformulatedModel)
            setOutput(data)
            setRunningModel(false)
        } catch (e) {
            console.error(e)
            setRunningModel(false)
        }
    }

    function runModel() {
        updateModel(model)
    }

    return (
        <div className="text-blueGray-100 text-lg lg:flex px-16 pt-16 pb-96 flex-grow">
            <div className="flex-col space-y-16">
                <div className="flex-col space-y-8">
                    <Tabs activeTab={activeTab} onChange={newValue => setActiveTab(newValue)} />
                    {
                        loadingModel || !model ? <ModelEditorSkeleton /> :
                            activeTab === 'income statement'
                                ? <IncomeStatementEditor model={model} onChange={updateModel} />
                                : <BalanceSheetEditor model={model} onChange={updateModel} />
                    }
                </div>
            </div>
            {
                output
                    ? <OutputDash model={model} output={output} onChange={updateModel} running={runningModel} />
                    : <Billboard runModel={runModel} running={runningModel} />
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
