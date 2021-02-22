import React, { Component } from "react";
import { Item, ItemTypeEnum, Model } from "../../../../client";
import { AutoForm, Schema } from "../../../AutoForms/AutoForm";
import { DeleteButton } from "../../../DeleteButton";
import { FormulaEditor } from "./FormulaEditor";
import { ItemDescriptionInput } from "./ItemDescriptionInput";
import { ItemFY0Input } from "./ItemFY0Input";

interface ItemEditorProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

interface State {

}
/**
 * Shows an editor for the Item but also 
 * can be swapped to edit the Drivers that belong to the Item
 */

export class IncomeStatementItemEditor extends Component<ItemEditorProps, State> {

    constructor(props) {
        super(props);
    }

    schemaOf(item: Item): Schema[] {
        switch (item.type) {
            case ItemTypeEnum.SaaSRevenue:
                return [
                    {
                        name: 'totalSubscriptionAtTerminalYear',
                        label: "Total Subscription at Terminal Year",
                        type: "integer"
                    },
                    {
                        name: 'initialSubscriptions',
                        label: 'Initial Subscriptions',
                        type: "integer"
                    },
                    {
                        name: 'averageRevenuePerSubscription',
                        label: "Average Revenue per Subscription",
                        type: "number"
                    }
                ]
            case ItemTypeEnum.FixedCost:
                return [
                    {
                        name: "cost",
                        label: "Cost",
                        type: "number"
                    }
                ]
            case ItemTypeEnum.VariableCost:
                return [
                    {
                        label: 'Percent of Revenue',
                        name: 'percentOfRevenue',
                        type: "percent",
                        description: 'Percent Of Revenue'
                    }
                ]
            default:
                return null
        }
    }

    bodyOf(item: Item): any {
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

    merge(item: Item, property: any): Item {
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
    updateDescription(newDescription) {
        const { model, item, onChange } = this.props;
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, description: newDescription }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }
    updateHistoricalValue(newHistoricalValue) {
        const { model, item, onChange } = this.props;
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, historicalValue: newHistoricalValue }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    updateProperty(newValue: any) {
        const { model, item, onChange } = this.props;
        const newItem = this.merge(item, newValue)
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    deleteItem() {
        const { model, item, onChange } = this.props;
        const updatedItems = model.incomeStatementItems?.filter(i => i.name !== item.name)
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    updateFormula(newFormula: string) {
        const { model, item, onChange } = this.props;
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

    updateType(newType: ItemTypeEnum) {
        const { model, item, onChange } = this.props;
        const newItem: Item = { ...item, type: newType }
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    render() {
        const { item } = this.props;
        return (
            <div
                className="absolute top-0 z-10 left-full ml-4 bg-blueGray-800 px-20 py-8 rounded-lg shadow-md flex-col space-y-8"
            >
                <div className="flex-col space-y-4">
                    <ItemDescriptionInput item={item} onChange={this.updateDescription.bind(this)} />
                    <ItemFY0Input item={item} onChange={this.updateHistoricalValue.bind(this)} />
                </div>
                <Select label="Item Type" value={item.type} onChange={({ currentTarget: { value } }) => this.updateType(value as any)}>
                    <option value={ItemTypeEnum.Custom}>Custom</option>
                    <option value={ItemTypeEnum.SaaSRevenue}>SaaS Revenue</option>
                    <option value={ItemTypeEnum.VariableCost}>Variable Cost</option>
                    <option value={ItemTypeEnum.FixedCost}>Fixed Cost</option>
                </Select>
                {
                    item.type === ItemTypeEnum.Custom
                        ?
                        <FormulaEditor item={item} onSubmit={this.updateFormula.bind(this)} />
                        :
                        <AutoForm
                            schema={this.schemaOf(item)}
                            body={this.bodyOf(item)}
                            onSubmit={this.updateProperty.bind(this)}
                        />
                }
                <DeleteButton onClick={this.deleteItem.bind(this)}>Delete Item</DeleteButton>
            </div>
        )
    }
}

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label?: string
    caption?: string
}

function Select({ label, caption, className, children, ...props }: SelectProps) {
    return (
        <div className="flex-col space-y-4 flex">
            {label ? <label className="text-sm">{label}</label> : null}
            <select
                className={`focus:outline-none border appearance-none border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2 ${className}`}
                {...props}
            >
                {children}
            </select>
            {caption ? <p className="text-xs text-blueGray-600">{caption}</p> : null}
        </div>
    )
}