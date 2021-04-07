import React from 'react'
import { useFilingEntityManager } from '../../../api-hooks'
import { FilingEntity, Item, StockAnalysis2 } from '../../../client'
import { Select } from '../../Common/Select'
import Tab from '../../Common/Tab'
import { TextInput } from '../../Common/TextInput'
import { ItemDisplay } from './ItemEditor/ItemDisplay'
import { Bootstrapping, Completed } from './ControlPanel'

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis2
    onFilingEntityUpdate: (entity: FilingEntity) => void
    onStockAnalysisUpdate: (newStockAnalysis: StockAnalysis2) => void
}

export default function Editor(props: Props) {

    const { filingEntity, stockAnalysis, onFilingEntityUpdate, onStockAnalysisUpdate } = props
    const filingEntityManager = useFilingEntityManager()

    async function changeModelTemplate(template: string) {
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity, modelTemplate: {
                name: template,
                template
            }
        };
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        onFilingEntityUpdate(updatedFilingEntity)
    }

    async function updateBeta(event: React.ChangeEvent<HTMLInputElement>) {
        const beta = parseFloat(event.currentTarget.value)
        const updatedFilingEntity: StockAnalysis2 = {
            ...stockAnalysis,
            model: {
                ...stockAnalysis.model,
                beta
            }
        }
        onStockAnalysisUpdate(updatedFilingEntity)
    }

    async function handleChange(newItem: Item) {
        const itemOverrides = stockAnalysis.model?.itemOverrides
        const updatedItemOverrides = [...itemOverrides.filter(it => it.name !== newItem.name), newItem]
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: {
                ...stockAnalysis.model,
                itemOverrides: updatedItemOverrides
            }
        }
        props.onStockAnalysisUpdate(updatedStockAnalysis)
    }

    async function handleClear(item: Item) {
        const itemOverrides = stockAnalysis.model?.itemOverrides
        const updatedItemOverrides = [...itemOverrides.filter(it => it.name !== item.name)]
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: {
                ...stockAnalysis.model,
                itemOverrides: updatedItemOverrides
            }
        }
        props.onStockAnalysisUpdate(updatedStockAnalysis)
    }

    return (
        <div className="rounded md:p-4 md:border md:border-blueGray-500 space-y-8">
            <div className="space-y-4">
                {
                    filingEntity?.statusMessage === Completed
                        ?
                        <Select
                            onChange={({ currentTarget: { value } }) => changeModelTemplate(value)}
                            value={filingEntity?.modelTemplate?.template}
                            label="Choose Model Template"
                            className="lg:w-80"
                        >
                            <option></option>
                            <option value="Recovery">Recovery</option>
                            <option value="Normal">Normal</option>
                        </Select>
                        : null
                }
                {
                    filingEntity?.statusMessage === Completed
                        ?
                        <TextInput value={stockAnalysis?.model?.beta} type="number" onChange={updateBeta} label="Beta" className="w-24" />
                        : null
                }
            </div>
            {
                filingEntity?.statusMessage !== Completed
                    ?
                    <blockquote className="text-lg pl-8 py-4 border-l-4 border-blueGray-500">
                        {filingEntity?.statusMessage === Bootstrapping ? 'Facts are still being parsed ... check back later' : 'Facts have not been bootstrapped yet. Please use "Bootstrap"'}
                    </blockquote>
                    :
                    stockAnalysis !== undefined
                        ?
                        <div className="pt-6">
                            <div className="flex space-x-4 mb-4">
                                <Tab active>Income Statement</Tab>
                            </div>
                            <div className="space-y-2">
                                {
                                    stockAnalysis
                                        ?.model
                                        ?.incomeStatementItems
                                        ?.filter(item => item.formula !== '0.0')
                                        ?.map(item => {
                                            const overrideItem = stockAnalysis?.model?.itemOverrides?.find(it => it.name === item.name)
                                            return (
                                                <ItemDisplay
                                                    overriden={overrideItem !== undefined}
                                                    item={overrideItem ?? item}
                                                    onChange={handleChange}
                                                    onClear={handleClear}
                                                />
                                            )
                                        })
                                }
                            </div>
                        </div>
                        :
                        <blockquote className="text-lg pl-8 py-4 border-l-4 border-blueGray-500">
                            No model exists yet for this company. Please use <code>Run Analysis</code>
                        </blockquote>
            }
        </div>
    )

}
