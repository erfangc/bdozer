import React, { useEffect, useState } from 'react';
import { Model, ModelBuilderControllerApi } from '../../client';
import { BalanceSheetEditor } from './BalanceSheetEditor/BalanceSheetEditor';
import { Billboard } from './Billboard';
import { IncomeStatementEditor } from './IncomeStatementEditor/IncomeStatementEditor';

const api = new ModelBuilderControllerApi()

export function ModelEditor() {

    const [model, setModel] = useState<Model | undefined>()
    const [activeTab, setActiveTab] = useState<'income statement' | 'balance sheet'>('income statement')

    // load the model from the backend
    useEffect(() => {
        api.createModel().then(({ data }) => setModel(data))
    }, [])

    /**
     * Function to handle updating / reformulating the model
     * @param newModel 
     */
    async function updateModel(newModel: Model) {
        setModel(newModel)
        // reformulate the model via the back-end
        const { data: reformulatedModel } = await api.reformulateModel(newModel)
        setModel(reformulatedModel)
    }

    if (model === undefined) {
        return null
    }

    return (
        <div className="text-blueGray-100 text-lg container mx-auto pt-24 pb-96 lg:flex">
            <div>
                <Tabs activeTab={activeTab} onChange={newValue => setActiveTab(newValue)} />
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

interface TabsProps {
    activeTab: 'income statement' | 'balance sheet'
    onChange: (newTab: 'income statement' | 'balance sheet') => void
}

function Tabs({ activeTab, onChange }: TabsProps) {

    const activeClass = "border-b-4 border-blue-500 text-lg text-blueGray-50 pb-2 transition ease-linear hover:border-blue-200 focus:outline-none"
    const inactiveClass = "border-b-4 border-blueGray-900 text-lg text-blueGray-400 pb-2 transition ease-linear hover:border-blue-500 hover:text-blueGray-50 focus:outline-none"

    return (
        <div className="flex space-x-4 mb-8">
            <button className={activeTab === 'income statement' ? activeClass : inactiveClass} onClick={() => onChange('income statement')}>
                Income Statement
            </button>
            <button className={activeTab === 'balance sheet' ? activeClass : inactiveClass} onClick={() => onChange('balance sheet')}>
                Balance Sheet
            </button>
        </div>
    )

}
