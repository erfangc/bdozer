import React from 'react';
import { useFilingEntityManager } from '../../../../api-hooks';
import { FilingEntity, StockAnalysis2 } from '../../../../client';
import { Select } from '../../../Common/Select';
import Tab from '../../../Common/Tab';
import { TextInput } from '../../../Common/TextInput';
import { ItemDisplay } from './ItemDisplay';

interface Props {
    filingEntity: FilingEntity
    stockAnalysis: StockAnalysis2
    setFilingEntity: (entity: FilingEntity) => void
    setStockAnalysis: (newStockAnalysis: StockAnalysis2) => void
}

export default function Editor(props: Props) {

    const { filingEntity, stockAnalysis, setFilingEntity, setStockAnalysis } = props
    const filingEntityManager = useFilingEntityManager()

    async function changeModelTemplate(template: string) {
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity, modelTemplate: {
                name: template,
                template
            }
        };
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        setFilingEntity(updatedFilingEntity)
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
        setStockAnalysis(updatedFilingEntity)
    }

    return (
        <div className="rounded md:p-4 md:border md:border-blueGray-500 space-y-8">
            <div className="space-y-4">
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
                <TextInput
                    value={stockAnalysis?.model?.beta ?? ''}
                    type="number"
                    onChange={updateBeta}
                    label="Beta"
                    className="w-24"
                />
            </div>
            <div className="pt-6">
                <div className="flex space-x-4 mb-4">
                    <Tab active>Income Statement</Tab>
                </div>
                <div className="space-y-2">
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
