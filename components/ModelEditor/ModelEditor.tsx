import React, { useEffect, useState } from 'react';
import { Model, ModelBuilderControllerApi } from '../../client';
import { BalanceSheetEditor } from './BalanceSheetEditor/BalanceSheetEditor';
import { Billboard } from './Billboard';
import { IncomeStatementEditor } from './IncomeStatementEditor/IncomeStatementEditor';

const api = new ModelBuilderControllerApi()

export function ModelEditor() {

    const [model, setModel] = useState<Model | undefined>()
    const [activeTab, setActiveTab] = useState<'income statement' | 'balance sheet'>('income statement')

    useEffect(() => {
        api.createModel().then(({ data }) => setModel(data))
    }, []) // load model from backend

    const items = model?.incomeStatementItems ?? [];

    async function updateModel(newModel: Model) {
        setModel(newModel)
        // reformulate the model via the back-end
        const { data: reformulatedModel } = await new ModelBuilderControllerApi().reformulateModel(newModel)
        setModel(reformulatedModel)
    }

    if (model === undefined) {
        return null
    }

    return (
        <div className="text-blueGray-100 text-lg container mx-auto pt-24 pb-96 lg:flex">
            {/* tabs */}
            <div>
                <Tabs></Tabs>
                {
                    activeTab === 'income statement'
                        ? <IncomeStatementEditor model={model} onChange={updateModel} />
                        : <BalanceSheetEditor model={model} onChange={updateModel} />
                }
            </div>
            <Billboard />
        </div>
    )
}

function Tabs() {
    return (
        <div className="flex space-x-4 mb-8">
            <button className="border-b-4 border-blue-500 text-lg text-blueGray-50 pb-2 transition ease-linear hover:border-blue-200">
                Income Statement
            </button>
            <button className="border-b-4 border-blueGray-900 text-lg text-blueGray-400 pb-2 transition ease-linear hover:border-blue-500 hover:text-blueGray-50">
                Balance Sheet
            </button>
        </div>
    )
}