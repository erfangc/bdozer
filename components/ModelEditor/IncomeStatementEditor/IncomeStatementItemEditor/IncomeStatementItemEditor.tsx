import React from "react";
import { Item, ItemTypeEnum, Model } from "../../../../client";
import { AutoForm } from "../../../AutoForms/AutoForm";
import { SchemaObject } from "../../../AutoForms/OpenAPITypes";
import { DeleteButton } from "../../../DeleteButton";
import { ItemDescriptionInput } from "./ItemDescriptionInput";
import { ItemFY0Input } from "./ItemFY0Input";

interface ItemEditorProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

/**
 * Shows an editor for the Item but also 
 * can be swapped to edit the Drivers that belong to the Item
 */
export function IncomeStatementItemEditor({ model, item, onChange }: ItemEditorProps) {

    function updateDescription(newDescription) {
        // TODO validate the new description
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, description: newDescription }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    function updateHistoricalValue(newHistoricalValue) {
        // TODO validate the new description
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, historicalValue: newHistoricalValue }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    function updateProperty(newValue: any) {
        const newItem = merge(item, newValue)
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    function deleteItem() {
        const updatedItems = model.incomeStatementItems?.filter(i => i.name !== item.name)
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    function updateFormula(newFormula: string) {
        const newItem = { ...item, expression: newFormula }
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    return (
        <div className="absolute top-0 left-full ml-4 bg-blueGray-800 px-20 py-8 rounded-lg shadow-md flex-col space-y-8">
            <div className="flex-col space-y-4">
                <ItemDescriptionInput item={item} onChange={updateDescription} />
                <ItemFY0Input item={item} onChange={updateHistoricalValue} />
            </div>
            {
                item.type === ItemTypeEnum.Custom
                    ?
                    <FormulaInput item={item} onSubmit={updateFormula} />
                    :
                    <AutoForm
                        schema={schemaOf(item)}
                        body={bodyOf(item)}
                        onSubmit={updateProperty}
                    />
            }
            <DeleteButton onClick={deleteItem}>Delete Item</DeleteButton>
        </div>
    )
}

function FormulaInput({ item, onSubmit }: { item: Item, onSubmit: (string) => void }) {

    function handleChange({ currentTarget: { value } }: React.ChangeEvent<HTMLTextAreaElement>) {
        onSubmit(value)
    }

    return (
        <div className="flex-col space-y-4">
            <p className="flex items-center">
                <span>Formula</span>
                <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
            </p>
            <textarea
                name="expression"
                rows={3}
                value={item.expression}
                onChange={handleChange}
                className="w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                placeholder="Enter formula"
            />
        </div>
    )
}

function schemaOf(item: Item): SchemaObject {
    switch (item.type) {
        case ItemTypeEnum.SaaSRevenue:
            return {
                type: "object",
                properties: {
                    totalSubscriptionAtTerminalYear: {
                        description: "Total Subscription at Terminal Year",
                        type: "integer",
                        format: "int32"
                    },
                    initialSubscriptions: {
                        description: 'Initial Subscriptions',
                        type: "integer",
                        format: "int32"
                    },
                    averageRevenuePerSubscription: {
                        description: "Average Revenue per Subscription",
                        type: "number",
                        format: "double"
                    }
                }
            }
        case ItemTypeEnum.FixedCost:
            return {
                type: "object",
                properties: {
                    cost: {
                        "type": "number",
                        "format": "double"
                    }
                }
            }
        case ItemTypeEnum.VariableCost:
            return {
                type: "object",
                properties: {
                    percentOfRevenue: {
                        type: "number",
                        format: "double"
                    }
                }
            }
        default:
            return null
    }
}

function bodyOf(item: Item): any {
    switch (item.type) {
        case ItemTypeEnum.SaaSRevenue:
            return item.saaSRevenue
        case ItemTypeEnum.VariableCost:
            return item.variableCost
        case ItemTypeEnum.FixedCost:
            return item.fixedCost
        default:
            return {}
    }
}

function merge(item: Item, property: any): Item {
    switch (item.type) {
        case ItemTypeEnum.SaaSRevenue:
            return { ...item, saaSRevenue: { ...property } }
        case ItemTypeEnum.VariableCost:
            return { ...item, variableCost: { ...property } }
        case ItemTypeEnum.FixedCost:
            return { ...item, fixedCost: { ...property } }
        default:
            return {}
    }
}