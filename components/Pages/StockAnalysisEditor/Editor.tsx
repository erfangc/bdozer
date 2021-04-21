import React, {useState} from 'react';
import {StockAnalysis2, Tag} from '../../../client';
import Tab from '../../Common/Tab';
import {ManagedTextInput} from '../../Common/TextInput';
import {ItemDisplay} from './ItemDisplay';
import StockAnalysisSummary from './StockAnalysisSummary';
import {TagInput} from "../../TagInput";

interface Props {
    stockAnalysis: StockAnalysis2
    setStockAnalysis: (StockAnalysis2) => void
    loading: boolean
}

export default function Editor(props: Props) {

    const {stockAnalysis, setStockAnalysis, loading} = props
    const [tab, setTab] = useState<'income statement' | 'balance sheet'>('income statement')

    async function updateBeta(newValue: string) {
        const beta = parseFloat(newValue)
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: {...stockAnalysis.model, beta}
        }
        setStockAnalysis(updatedStockAnalysis)
    }

    async function updatePeriods(newValue: string) {
        const periods = parseFloat(newValue);
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: {...stockAnalysis.model, periods}
        }
        setStockAnalysis(updatedStockAnalysis)
    }

    async function updateTags(tags: Tag[]) {
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            tags: tags.map(it => it['_id'])
        }
        setStockAnalysis(updatedStockAnalysis)
    }

    return (
        <div className="md:p-4 space-y-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 rounded">
                <div className="space-y-4">
                    <TagInput onChange={updateTags} label="Tags" selected={stockAnalysis?.tags}/>
                    <div className="flex space-x-4">
                        <ManagedTextInput
                            value={stockAnalysis?.model?.beta ?? ''}
                            type="number"
                            label="Beta"
                            className="w-24"
                            onInputSubmit={updateBeta}
                        />
                        <ManagedTextInput
                            value={stockAnalysis?.model?.periods ?? ''}
                            type="number"
                            label="Projection Years"
                            className="w-24"
                            onInputSubmit={updatePeriods}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <StockAnalysisSummary stockAnalysis={stockAnalysis} loading={loading}/>
                </div>
            </div>
            <div className="pt-6">
                <div className="flex space-x-4 mb-8">
                    <Tab active={tab === 'income statement'} onClick={() => setTab('income statement')}>Income
                        Statement</Tab>
                    <Tab active={tab === 'balance sheet'} onClick={() => setTab('balance sheet')}>Balance Sheet</Tab>
                </div>
                <div className="space-y-2">
                    <div
                        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-4 font-semibold text-blueGray-400">
                        <span>Name</span>
                        <span className="flex justify-start md:justify-end items-center">Most Recently Reported</span>
                    </div>
                    {
                        tab === 'income statement'
                            ?
                            stockAnalysis
                                ?.model
                                ?.incomeStatementItems
                                ?.map(item => <ItemDisplay key={item.name} stockAnalysis={stockAnalysis} item={item}/>)
                            :
                            stockAnalysis
                                ?.model
                                ?.balanceSheetItems
                                ?.map(item => <ItemDisplay key={item.name} stockAnalysis={stockAnalysis} item={item}/>)
                    }
                </div>
            </div>
        </div>
    )

}
