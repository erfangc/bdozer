import React from 'react';
import { useFilingEntityManager } from '../../../../api-hooks';
import { FilingEntity, StockAnalysis2 } from '../../../../client';
import { Select } from '../../../Common/Select';
import Tab from '../../../Common/Tab';
import { TextInput } from '../../../Common/TextInput';
import { ItemDisplay } from './ItemDisplay';
import StockAnalysisSummary from './StockAnalysisSummary';

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis2
    setFilingEntity: (entity: FilingEntity) => void
    setStockAnalysis: (newStockAnalysis: StockAnalysis2) => void
}

export default function Editor(props: Props) {

    const { filingEntity, stockAnalysis, setFilingEntity, setStockAnalysis } = props
    const filingEntityManager = useFilingEntityManager()

    async function changeModelTemplate(event: React.ChangeEvent<HTMLSelectElement>) {
        const { currentTarget: { value } } = event
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity, modelTemplate: {
                name: value,
                template: value
            }
        };
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        setFilingEntity(updatedFilingEntity)
    }

    async function updateBeta(event: React.ChangeEvent<HTMLInputElement>) {
        const beta = parseFloat(event.currentTarget.value)
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: { ...stockAnalysis.model, beta }
        }
        setStockAnalysis(updatedStockAnalysis)
    }

    return (
        <div className="rounded md:p-4 space-y-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 rounded-md">
                <div className="space-y-4">
                    <Select
                        onChange={changeModelTemplate}
                        value={filingEntity?.modelTemplate?.template}
                        label="Choose Model Template"
                        className="lg:w-80"
                    >
                        <option />
                        <option value="Recovery">Recovery</option>
                        <option value="Normal">Normal</option>
                    </Select>
                    <TextInput
                        value={stockAnalysis?.model?.beta ?? ''}
                        type="number"
                        onChange={updateBeta}
                        label="Beta"
                        className="w-24"
                    />
                </div>
                <div className="col-span-2">
                    <StockAnalysisSummary stockAnalysis={stockAnalysis} loading={false} />
                </div>
            </div>
            <div className="pt-6">
                <div className="flex space-x-4 mb-4 pl-4">
                    <Tab active>Income Statement</Tab>
                    <Tab className="cursor-not-allowed">Balance Sheet</Tab>
                </div>
                <div className="space-y-2">
                    <div
                        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-4 font-semibold text-blueGray-400"
                    >
                        <span>Name</span>
                        <span className="flex justify-start md:justify-end items-center">
                            Most Recently Reported
                        </span>
                    </div>
                    {
                        stockAnalysis
                            ?.model
                            ?.incomeStatementItems
                            // TODO fix this line
                            ?.filter(item => item.formula !== '0.0')
                            ?.map(item => {
                                const overrideItem = stockAnalysis?.model?.itemOverrides?.find(it => it.name === item.name)
                                return (
                                    <ItemDisplay
                                        key={item.name}
                                        stockAnalysis={stockAnalysis}
                                        overriden={overrideItem !== undefined}
                                        item={overrideItem ?? item}
                                    />
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )

}
