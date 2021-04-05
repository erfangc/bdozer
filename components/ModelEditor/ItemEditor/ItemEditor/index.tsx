import React, { Component } from "react";
import { Item, ItemTypeEnum, Model } from "../../../../client";
import { AutoForm } from "../../../AutoForms/AutoForm";
import { bodyOf, merge, schemaOf } from "../../../AutoForms/Schemas";
import { DeleteButton } from "../../../Common/DeleteButton";
import { Select } from "../../../Common/Select";
import { FormulaEditor } from "./FormulaEditor";
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
export class IncomeStatementItemEditor extends Component<ItemEditorProps> {

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
            <div className="fixed top-2 left-0 right-0 lg:top-48 lg:left-32 lg:right-32 z-10 ml-4 bg-blueGray-700 px-2 lg:px-12 py-2 lg:py-4 rounded-lg shadow-md flex-col space-y-8">
                <div className="flex-col space-y-4">
                    <ItemDescriptionInput item={item} onChange={this.updateDescription.bind(this)} />
                    <ItemFY0Input item={item} onChange={this.updateHistoricalValue.bind(this)} />
                </div>
                <Select label="Item Type" value={item.type} onChange={({ currentTarget: { value } }) => this.updateType(value as any)}>
                    <option value={ItemTypeEnum.Custom}>Custom</option>
                    <option value={ItemTypeEnum.SubscriptionRevenue}>Subscription Revenue</option>
                    <option value={ItemTypeEnum.PercentOfTotalAsset}>Percent of Total Asset</option>
                    <option value={ItemTypeEnum.PercentOfRevenue}>Percent of Revenue</option>
                    <option value={ItemTypeEnum.FixedCost}>Fixed Cost</option>
                </Select>
                {
                    item.type === ItemTypeEnum.Custom
                        ?
                        <FormulaEditor
                            item={item}
                            onSubmit={this.updateFormula.bind(this)}
                        />
                        :
                        <AutoForm
                            schema={schemaOf(item)}
                            body={bodyOf(item)}
                            onSubmit={this.updateProperty.bind(this)}
                        />
                }
                <DeleteButton onClick={this.deleteItem.bind(this)}>Delete Item</DeleteButton>
            </div>
        )
    }
}
