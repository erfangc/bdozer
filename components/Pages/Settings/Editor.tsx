import React from 'react'
import { useFilingEntityManager } from '../../../api-hooks'
import { FilingEntity, StockAnalysis } from '../../../client'
import { Select } from '../../Common/Select'
import { TextInput } from '../../Common/TextInput'

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis
    onFilingEntityUpdate: (entity: FilingEntity) => void
}

export default function Editor(props: Props) {

    const { filingEntity, onFilingEntityUpdate } = props

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

    return filingEntity
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
        </div>
        : null

}
