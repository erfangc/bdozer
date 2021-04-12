import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useStockAnalysisCrud} from "../../../../../api-hooks";
import {Item, ItemTypeEnum, Model, StockAnalysis2} from "../../../../../client";
import {AutoForm} from "../../../../AutoForms/AutoForm";
import {bodyOf, merge, schemaOf} from "../../../../AutoForms/Schemas";
import {DeleteButton} from "../../../../Common/DeleteButton";
import {SecondaryButton} from "../../../../Common/SecondaryButton";
import {Select} from "../../../../Common/Select";
import {FormulaEditor} from "./FormulaEditor";
import {ItemDescriptionInput} from "./ItemDescriptionInput";
import {ItemFY0Input} from "./ItemFY0Input";
import {DiscreteEditor} from "./DiscreteEditor";

export function ItemEditor() {

    const router = useRouter()
    const {id, itemName} = router.query
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()
    const stockAnalysisCrud = useStockAnalysisCrud()

    async function init() {
        const {data: stockAnalysis} = await stockAnalysisCrud.getStockAnalysis(id as string)
        setStockAnalysis(stockAnalysis)
    }

    useEffect(() => {
        if (id) init()
    }, [id])

    async function updateItem(newItem: Item) {
        // delete it item from overrides
        const model = stockAnalysis.model
        const updatedModel: Model = {
            ...model,
            itemOverrides: [
                ...model.itemOverrides.filter(item => item.name !== newItem.name),
                newItem
            ]
        }
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: updatedModel
        }
        setStockAnalysis(updatedStockAnalysis)
        await stockAnalysisCrud.saveStockAnalysis(updatedStockAnalysis)
    }

    function updateDescription(newDescription) {
        const newItem = {...item, description: newDescription}
        updateItem(newItem)
    }

    function updateHistoricalValue(newHistoricalValue) {
        const newItem = {...item, historicalValue: newHistoricalValue}
        updateItem(newItem)
    }

    async function handleSubmit(newValue: any) {
        const newItem = merge(item, newValue)
        await updateItem(newItem)
        back()
    }

    async function updateFormula(newFormula: string) {
        const newItem = {...item, formula: newFormula}
        await updateItem(newItem)
        back()
    }

    function updateType(newType: ItemTypeEnum) {
        const newItem: Item = {...item, type: newType}
        updateItem(newItem)
    }

    async function clearItem() {
        // delete it item from overrides
        const model = stockAnalysis.model
        const updatedModel: Model = {
            ...model,
            itemOverrides: [
                ...model.itemOverrides.filter(i => i.name !== item.name),
            ]
        }
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: updatedModel
        }
        setStockAnalysis(updatedStockAnalysis)
        await stockAnalysisCrud.saveStockAnalysis(updatedStockAnalysis)
        back()
    }

    function back() {
        router.push(`/control-panel/stock-analyses/${id}`)
    }

    const model = stockAnalysis?.model

    const original = (
        [
            ...(model?.incomeStatementItems ?? []),
            ...(model?.cashFlowStatementItems ?? []),
            ...(model?.balanceSheetItems ?? []),
            ...(model?.otherItems ?? []),
        ]
    ).find(it => it.name === itemName)

    const override = model?.itemOverrides.find(item => item.name === itemName)

    const item = override ?? original

    if (!item) {
        return null
    } else {
        return (
            // outer layer is the overlay
            <div className="container mx-auto px-2 max-w-prose py-12">
                <div className="bg-blueGray-700 px-2 lg:px-12 py-3 lg:py-8 rounded-lg shadow-md flex-col space-y-8">
                    <div className="flex-col space-y-4">
                        <div>
                            <label className="text-sm">Name</label>
                            <p className="mt-2 cursor-not-allowed border rounded border-blueGray-400 text-blueGray-300 px-3 py-2">{item.name}</p>
                        </div>
                        <ItemDescriptionInput item={item} onChange={updateDescription}/>
                        <ItemFY0Input item={item} onChange={updateHistoricalValue}/>
                    </div>
                    <Select
                        label="Item Type"
                        value={item.type}
                        onChange={({currentTarget: {value}}) => updateType(value as any)}
                    >
                        <option value={ItemTypeEnum.Custom}>Custom</option>
                        <option value={ItemTypeEnum.SubscriptionRevenue}>Subscription Revenue</option>
                        <option value={ItemTypeEnum.PercentOfRevenue}>Percent of Revenue</option>
                        <option value={ItemTypeEnum.FixedCost}>Fixed Cost</option>
                        <option value={ItemTypeEnum.Discrete}>Discrete</option>
                        <option value={ItemTypeEnum.CompoundedGrowth}>Compounded Growth</option>
                    </Select>
                    {
                        item.type === ItemTypeEnum.Discrete
                            ?
                            <DiscreteEditor item={item} onSubmit={updateItem}/>
                            :
                            item.type === ItemTypeEnum.Custom
                                ?
                                <FormulaEditor item={item} onSubmit={updateFormula}/>
                                :
                                <AutoForm
                                    schema={schemaOf(item)}
                                    body={bodyOf(item)}
                                    onSubmit={handleSubmit}
                                />
                    }
                    <div className="space-x-2">
                        {item === override ?
                            <DeleteButton className="w-24" onClick={clearItem}>Clear</DeleteButton> : null}
                        <SecondaryButton className="w-24" onClick={back}>Back</SecondaryButton>
                    </div>
                </div>
            </div>
        )
    }
}
