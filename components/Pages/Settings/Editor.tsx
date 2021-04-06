import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useModelOverrides } from '../../../api-hooks'
import { FilingEntity, Item, ModelOverride, StockAnalysis } from '../../../client'
import { Select } from '../../Common/Select'
import Tab from '../../Common/Tab'
import { TextInput } from '../../Common/TextInput'
import { ItemDisplayComponent } from './ItemEditor/ItemDisplay'
import { Bootstrapping, Completed } from './Settings'

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis
    onFilingEntityUpdate: (entity: FilingEntity) => void
}

export default function Editor(props: Props) {

    const { filingEntity, stockAnalysis, onFilingEntityUpdate } = props
    const filingEntityManager = useFilingEntityManager()
    const modelOverrides = useModelOverrides()
    const [modelOverride, setModelOverride] = useState<ModelOverride>()

    async function init() {
        const resp = await modelOverrides.getOverrides(stockAnalysis.cik)
        setModelOverride(resp.data)
    }

    async function changeModelTemplate(template: string) {
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity, modelTemplate: {
                name: template, template
            }
        };
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        onFilingEntityUpdate(updatedFilingEntity)
    }

    async function updateBeta(event: React.ChangeEvent<HTMLInputElement>) {
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity,
            beta: parseFloat(event.currentTarget.value)
        }
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        onFilingEntityUpdate(updatedFilingEntity)
    }

    useEffect(() => {
        if (stockAnalysis?.cik) {
            init()
        }
    }, [stockAnalysis?.cik])

    async function handleItemOverride(updatedItem: Item) {
        const updatedItems = [
            ...modelOverride
                .items
                .filter(item => updatedItem.name !== item.name),
            updatedItem
        ]
        const updatedModelOverride: ModelOverride = {
            ...modelOverride,
            items: updatedItems
        }
        setModelOverride(updatedModelOverride)
        await modelOverrides.saveOverrides(updatedModelOverride)
    }

    async function handleClear(itemToRemove: Item) {
        const updatedItems = [
            ...modelOverride
                .items
                .filter(item => itemToRemove.name !== item.name),
        ]
        const updatedModelOverride: ModelOverride = {
            ...modelOverride,
            items: updatedItems
        }
        setModelOverride(updatedModelOverride)
        await modelOverrides.saveOverrides(updatedModelOverride)
    }

    return (
        <div className="border border-blueGray-500 rounded p-4 space-y-8">
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
                {filingEntity?.statusMessage === Completed ? <TextInput value={filingEntity.beta} type="number" onChange={updateBeta} label="Beta" className="w-24" /> : null}
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
                                            const overrideItem = modelOverride?.items?.find(it => it.name === item.name)
                                            return (
                                                <ItemDisplayComponent
                                                    overriden={overrideItem !== undefined}
                                                    item={overrideItem ?? item}
                                                    onChange={handleItemOverride}
                                                    onClear={handleClear}
                                                />
                                            )
                                        })
                                }
                            </div>
                        </div>
                        :
                        <blockquote className="text-lg pl-8 py-4 border-l-4 border-blueGray-500">
                            No model exists yet for this company. Please use "Run Analysis"
                        </blockquote>
            }
        </div>
    )

}
