import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useStockAnalysisCrud} from "../../../../../api-hooks";
import {Discrete, Item, ItemTypeEnum, Model, StockAnalysis2} from "../../../../../client";
import {AutoForm} from "../../../../AutoForms/AutoForm";
import {bodyOf, merge, schemaOf} from "../../../../AutoForms/Schemas";
import {DeleteButton} from "../../../../Common/DeleteButton";
import {SecondaryButton} from "../../../../Common/SecondaryButton";
import {Select} from "../../../../Common/Select";
import {FormulaEditor} from "./FormulaEditor";
import {ItemDescriptionInput} from "./ItemDescriptionInput";
import {ItemFY0Input} from "./ItemFY0Input";
import {NumberInput} from "../../../../Common/NumberInput";
import {year} from "../../../../../year";
import {PrimaryButton} from "../../../../Common/PrimaryButton";
import {NumberFormatValues} from "react-number-format";

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
            <div className="container mx-auto max-w-prose py-20">
                <div className="bg-blueGray-700 px-2 lg:px-12 py-3 lg:py-8 rounded-lg shadow-md flex-col space-y-8">
                    <div className="flex-col space-y-4">
                        <ItemDescriptionInput item={item} onChange={updateDescription}/>
                        <ItemFY0Input item={item} onChange={updateHistoricalValue}/>
                    </div>
                    <Select label="Item Type" value={item.type}
                            onChange={({currentTarget: {value}}) => updateType(value as any)}>
                        <option value={ItemTypeEnum.Custom}>Custom</option>
                        <option value={ItemTypeEnum.SubscriptionRevenue}>Subscription Revenue</option>
                        <option value={ItemTypeEnum.PercentOfTotalAsset}>Percent of Total Asset</option>
                        <option value={ItemTypeEnum.PercentOfRevenue}>Percent of Revenue</option>
                        <option value={ItemTypeEnum.FixedCost}>Fixed Cost</option>
                        <option value={ItemTypeEnum.Discrete}>Discrete</option>
                    </Select>
                    {
                        item.type === ItemTypeEnum.Discrete ? <DiscreteEditor item={item} onSubmit={updateItem}/> :
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

interface DiscreteEditorProps {
    item: Item
    onSubmit: (Item) => void
}

function str2Number(formulas: { [p: string]: string }) {
    return Object.keys(formulas).reduce((previousValue, key) => ({...previousValue, [key]: parseFloat(formulas[key])}), {})
}

function DiscreteEditor({item, onSubmit}: DiscreteEditorProps) {

    const discrete = item.discrete ?? {formulas:{}}

    const [formulas, setFormulas] = useState(str2Number(discrete.formulas))
    const keys = Object.keys(formulas).sort()

    function handleChange(key, values: NumberFormatValues) {
        setFormulas({...formulas, [key]: values.floatValue})
    }

    function handleSubmit() {
        onSubmit({...item, discrete: {...discrete, formulas}})
    }

    function add() {
        const lastKey = keys[keys.length - 1]
        const lastValue = formulas[lastKey]
        const key = keys.length === 0 ? 1 : parseInt(lastKey) + 1;
        const updatedFormula = {
            ...formulas, [key]: lastValue
        }
        const newItem = {
            ...item,
            discrete: {...discrete, formulas: updatedFormula}
        }
        setFormulas((updatedFormula))
        onSubmit(newItem)
    }

    function remove(key: string) {
        const updatedFormulas = {
            ...formulas
        }
        delete updatedFormulas[key]
        const newItem = {
            ...item,
            discrete: {...discrete, formulas: updatedFormulas}
        }
        onSubmit(newItem)
        setFormulas(updatedFormulas)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {keys.map(key => {
                    return (
                        <div key={key} className="flex space-x-1">
                            <NumberInput
                                value={formulas[key]}
                                label={year(key).toString()}
                                onValueChange={values => handleChange(key, values)}
                                onBlur={handleSubmit}
                            />
                            <button
                                onClick={() => remove(key)}
                                className="fill-current text-blueGray-500 hover:text-blueGray-400 transition ease-linear mt-6 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        </div>
                    )
                })}
            </div>
            <PrimaryButton onClick={add}>Add</PrimaryButton>
        </div>
    );
}