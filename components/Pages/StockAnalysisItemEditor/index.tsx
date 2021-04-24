import {useRouter} from "next/router";
import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {useFactBaseUnsecured, useStockAnalysis, useZacksEstimates} from "../../../api-hooks";
import {Fact, Item, ItemTypeEnum, Model, StockAnalysis2} from "../../../client";
import {AutoForm} from "../../AutoForms/AutoForm";
import {bodyOf, merge, schemaOf} from "../../AutoForms/Schemas";
import {DeleteButton} from "../../Common/DeleteButton";
import {SecondaryButton} from "../../Common/SecondaryButton";
import {Select} from "../../Common/Select";
import {FormulaEditor} from "./Editors/FormulaEditor";
import {ItemDescriptionInput} from "./ItemDescriptionInput";
import {ItemFY0Input} from "./ItemFY0Input";
import {DiscreteEditor} from "./Editors/DiscreteEditor";
import {PercentOfRevenueEditor} from "./Editors/PercentOfRevenueEditor";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {FixedCostEditor} from "./Editors/FixedCostEditor";
import {SumOfOtherItemsEditor} from "./Editors/SumOfOtherItemsEditor";
import {PercentOfAnotherItemEditor} from "./Editors/PercentOfAnotherItemEditor";

function getItem(model?: Model, itemName?: string | string[]) {
    return (
        [
            ...(model?.incomeStatementItems ?? []),
            ...(model?.cashFlowStatementItems ?? []),
            ...(model?.balanceSheetItems ?? []),
            ...(model?.otherItems ?? []),
        ]
    ).find(it => it.name === itemName);
}

export function ItemEditor() {

    const router = useRouter()
    const factBase = useFactBaseUnsecured()
    const [fact, setFact] = useState<Fact>()
    const {id, itemName} = router.query
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()
    const stockAnalysisCrud = useStockAnalysis()
    const zacksEstimates = useZacksEstimates()

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            back()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    async function init() {
        const {data: stockAnalysis} = await stockAnalysisCrud.getStockAnalysis(id as string)
        const item = getItem(stockAnalysis?.model, itemName);
        /*
        query the underlying fact that populated this item
         */
        const factId = item?.historicalValue?.factId;
        if (factId) {
            const {data: fact} = await factBase.getFact(factId)
            setFact(fact)
        }

        setStockAnalysis(stockAnalysis);
    }

    useEffect(() => {
        if (id) init()
    }, [id])

    async function handleItemChange(newItem: Item) {
        // delete it item from overrides
        const model = stockAnalysis.model
        const updatedModel: Model = {
            ...model,
            itemOverrides: [
                ...model.itemOverrides.filter(item => item.name !== newItem.name),
                newItem
            ],
        }
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: updatedModel
        }
        setStockAnalysis(updatedStockAnalysis)
    }

    async function handleSubmit() {
        await stockAnalysisCrud.saveStockAnalysis(stockAnalysis)
        back()
    }

    async function handleAutoFormChange(newValue: any) {
        const newItem = merge(item, newValue)
        await handleItemChange(newItem)
    }

    function updateType(newType: ItemTypeEnum) {
        const newItem: Item = {...item, type: newType}
        handleItemChange(newItem)
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

    async function assignZacksEstimates() {
        const ticker = model.ticker
        const {data: discrete} = await zacksEstimates.revenueProjections(ticker);
        const newItem: Item = {
            ...item,
            type: ItemTypeEnum.Discrete,
            discrete,
        }
        await handleItemChange(newItem)
    }

    function back() {
        router.push(`/control-panel/stock-analyses/${id}`, undefined, {scroll: true})
    }

    const model = stockAnalysis?.model
    const originalItem = getItem(model, itemName)
    const overriddenItem = model?.itemOverrides.find(item => item.name === itemName)
    const item = overriddenItem ?? originalItem

    if (!item) {
        // probably still loading
        return null
    } else {

        let editor: ReactNode
        if (item.type === ItemTypeEnum.Discrete) {
            editor = <DiscreteEditor item={item} onSubmit={handleItemChange}/>
        } else if (item.type === ItemTypeEnum.FixedCost) {
            editor = <FixedCostEditor item={item} model={stockAnalysis?.model} onSubmit={handleItemChange}/>
        } else if (item.type === ItemTypeEnum.PercentOfRevenue) {
            editor = <PercentOfRevenueEditor item={item} model={stockAnalysis?.model} onSubmit={handleItemChange}/>
        } else if (item.type === ItemTypeEnum.Custom) {
            editor = <FormulaEditor item={item} onSubmit={handleItemChange}/>
        } else if (item.type === ItemTypeEnum.SumOfOtherItems) {
            editor = <SumOfOtherItemsEditor model={stockAnalysis?.model} item={item} onSubmit={handleItemChange}/>
        } else if (item.type === ItemTypeEnum.PercentOfAnotherItem) {
            editor = <PercentOfAnotherItemEditor model={stockAnalysis?.model} item={item} onSubmit={handleItemChange}/>
        } else {
            editor = <AutoForm schema={schemaOf(item)} body={bodyOf(item)} onSubmit={handleAutoFormChange}/>
        }

        const isOverridden = item === overriddenItem

        return (
            // outer layer is the overlay
            <div className="container mx-auto px-2 max-w-prose py-12">
                <div className="bg-blueGray-700 px-2 lg:px-12 py-3 lg:py-8 rounded-lg shadow-md flex-col space-y-8">
                    <div className="flex-col space-y-4">
                        <div>
                            <label className="text-sm">Name</label>
                            <p className="mt-2 cursor-not-allowed border rounded border-blueGray-400 text-blueGray-300 px-3 py-2 overflow-hidden overflow-ellipsis">
                                {item.name}
                            </p>
                        </div>
                        {
                            fact?.documentation
                                ?
                                <blockquote
                                    className="px-3 inline-block border-l-4 bg-blueGray-800 py-2 text-sm text-blueGray-300 mb-1">
                                    {fact.documentation}
                                </blockquote>
                                : null
                        }
                        <ItemDescriptionInput item={item} onSubmit={handleItemChange}/>
                        <ItemFY0Input item={item} onSubmit={handleItemChange}/>
                        {/* Revenue Item get the option to populate with Zacks Estimates */}
                        {
                            itemName === model.totalRevenueConceptName
                                ? (
                                    <div className="flex flex-col space-y-1">
                                        <label className="block text-sm">Quick Options: </label>
                                        <div className="h-px border-t border-blueGray-500 pt-2"/>
                                        <button onClick={assignZacksEstimates} className="py-1 px-2 text-sm bg-blue-600 rounded w-40">
                                            Use Zacks Estimates
                                        </button>
                                    </div>
                                )
                                : null
                        }
                    </div>
                    <Select
                        label="Item Type"
                        value={item.type}
                        onChange={({currentTarget: {value}}) => updateType(value as any)}
                    >
                        <option value={ItemTypeEnum.Custom}>Custom</option>
                        <option value={ItemTypeEnum.PercentOfRevenue}>Percent of Revenue</option>
                        <option value={ItemTypeEnum.PercentOfAnotherItem}>Percent of Another Item</option>
                        <option value={ItemTypeEnum.FixedCost}>Fixed Cost</option>
                        <option value={ItemTypeEnum.Discrete}>Discrete</option>
                        <option value={ItemTypeEnum.SumOfOtherItems}>Sum of Other Items</option>
                        <option value={ItemTypeEnum.CompoundedGrowth}>Compounded Growth</option>
                    </Select>
                    {editor}
                    <div className="flex space-x-2">
                        <PrimaryButton onClick={handleSubmit}>
                            {isOverridden ? 'Confirm' : 'Override'}
                        </PrimaryButton>
                        <SecondaryButton className="w-24" onClick={back}>
                            Back
                        </SecondaryButton>
                        {
                            isOverridden
                                ? <DeleteButton className="w-40" onClick={clearItem}>Clear Override</DeleteButton>
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
