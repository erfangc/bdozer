import React from 'react';
import {useFilingEntityManager} from '../../../../api-hooks';
import {FilingEntity, StockAnalysis2} from '../../../../client';
import {Select} from '../../../Common/Select';
import Tab from '../../../Common/Tab';
import {ManagedTextInput} from '../../../Common/TextInput';
import {ItemDisplay} from './ItemDisplay';
import StockAnalysisSummary from './StockAnalysisSummary';

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis2
    saveFilingEntity: (FilingEntity) => void
    saveStockAnalysis: (StockAnalysis2) => void
    loading: boolean
}

export default function Editor(props: Props) {

    const {filingEntity, stockAnalysis, saveFilingEntity, saveStockAnalysis, loading} = props

    const filingEntityManager = useFilingEntityManager()

    async function changeModelTemplate(event: React.ChangeEvent<HTMLSelectElement>) {
        const {currentTarget: {value}} = event
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity, modelTemplate: {
                name: value,
                template: value
            }
        };
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        saveFilingEntity(updatedFilingEntity)
    }

    async function updateBeta(newValue: string) {
        const beta = parseFloat(newValue)
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: {...stockAnalysis.model, beta}
        }
        saveStockAnalysis(updatedStockAnalysis)
    }

    async function updatePeriods(newValue: string) {
        const periods = parseFloat(newValue);
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: {...stockAnalysis.model, periods}
        }
        saveStockAnalysis(updatedStockAnalysis)
    }

    return (
        <div className="md:p-4 space-y-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 rounded-md">
                <div className="space-y-4">
                    <Select
                        onChange={changeModelTemplate}
                        value={filingEntity?.modelTemplate?.template}
                        label="Choose Model Template"
                        className="lg:w-80"
                    >
                        <option/>
                        <option value="Recovery">Recovery</option>
                        <option value="Normal">Normal</option>
                    </Select>
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
                            label="Projection Periods (Yrs)"
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
                    <Tab active>Income Statement</Tab>
                    <Tab disabled>Balance Sheet</Tab>
                </div>
                <div className="space-y-2">
                    <blockquote className="px-3 inline border-l-4 bg-blueGray-800 py-2 text-sm text-blueGray-300">
                        Click on items to edit
                    </blockquote>
                    <div
                        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-4 font-semibold text-blueGray-400">
                        <span>Name</span>
                        <span className="flex justify-start md:justify-end items-center">Most Recently Reported</span>
                    </div>
                    {
                        stockAnalysis
                            ?.model
                            ?.incomeStatementItems
                            // TODO fix this line
                            ?.filter(item => item.formula !== '0.0')
                            ?.map(item => <ItemDisplay key={item.name} stockAnalysis={stockAnalysis} item={item}/>)
                    }
                </div>
            </div>
        </div>
    )

}
