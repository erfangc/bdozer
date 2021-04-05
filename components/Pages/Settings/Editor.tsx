import React from 'react'
import { useFilingEntityManager } from '../../../api-hooks'
import { FilingEntity, StockAnalysis } from '../../../client'
import { Select } from '../../Common/Select'
import Tab from '../../Common/Tab'
import { TextInput } from '../../Common/TextInput'
import { ItemDisplayComponent } from '../../ModelEditor/ItemEditor/ItemDisplay'

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis
    onFilingEntityUpdate: (entity: FilingEntity) => void
}

export default function Editor(props: Props) {

    const { filingEntity, stockAnalysis, onFilingEntityUpdate } = props
    const filingEntityManager = useFilingEntityManager()

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

    return filingEntity && stockAnalysis
        ?
        <div className="border border-blueGray-500 rounded p-4 space-y-4">
            <Select
                onChange={({ currentTarget: { value } }) => changeModelTemplate(value)}
                value={filingEntity?.modelTemplate?.template}
                label="Choose Model Template"
                className="lg:w-96"
            >
                <option></option>
                <option value="Recovery">Recovery</option>
            </Select>
            <TextInput value={filingEntity.beta} type="number" onChange={updateBeta} label="Beta" className="w-24" />
            <div className="pt-6">
                <div className="flex space-x-4 mb-4">
                    <Tab active>Income Statement</Tab>
                </div>
                <div className="space-y-2">
                    {
                        stockAnalysis.model.incomeStatementItems.filter(item => item.formula !== '0.0').map(item => {
                            return (
                                <ItemDisplayComponent
                                    model={stockAnalysis.model}
                                    item={item}
                                    onChange={console.log}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
        : null

}
