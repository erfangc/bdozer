import React, { Component } from "react";
import { Model, Item, ItemTypeEnum } from "../../../client";
import { AutoForm } from "../../AutoForms/AutoForm";
import { merge, schemaOf, bodyOf } from "../../AutoForms/Schemas";
import { DeleteButton } from "../../DeleteButton";
import { Select } from "../../Select";
import { FormulaEditor } from "../IncomeStatementEditor/IncomeStatementItemEditor/FormulaEditor";
import { ItemDescriptionInput } from "../IncomeStatementEditor/IncomeStatementItemEditor/ItemDescriptionInput";
import { ItemFY0Input } from "../IncomeStatementEditor/IncomeStatementItemEditor/ItemFY0Input";

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

export class BalanceSheetItemEditor extends Component<ItemEditorProps, State> {

    constructor(props) {
        super(props);
    }

    updateDescription(newDescription) {
        const { model, item, onChange } = this.props;
        const updatedItems = model.balanceSheetItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, description: newDescription }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    updateHistoricalValue(newHistoricalValue) {
        const { model, item, onChange } = this.props;
        const updatedItems = model.balanceSheetItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, historicalValue: newHistoricalValue }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    updateProperty(newValue: any) {
        const { model, item, onChange } = this.props;
        const newItem = merge(item, newValue)
        const updatedItems = model.balanceSheetItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    deleteItem() {
        const { model, item, onChange } = this.props;
        const updatedItems = model.balanceSheetItems?.filter(i => i.name !== item.name)
        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    updateFormula(newFormula: string) {
        const { model, item, onChange } = this.props;
        const newItem = { ...item, expression: newFormula }
        const updatedItems = model.balanceSheetItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    updateType(newType: ItemTypeEnum) {
        const { model, item, onChange } = this.props;
        const newItem: Item = { ...item, type: newType }
        const updatedItems = model.balanceSheetItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return newItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, balanceSheetItems: updatedItems })
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
                    <option value={ItemTypeEnum.SubscriptionRevenue}>Subscription Revenue</option>
                    <option value={ItemTypeEnum.PercentOfTotalAsset}>Percent of Total Asset</option>
                    <option value={ItemTypeEnum.PercentOfRevenue}>Percent of Revenue</option>
                    <option value={ItemTypeEnum.FixedCost}>Fixed Cost</option>
                </Select>
                {
                    item.type === ItemTypeEnum.Custom
                        ?
                        <FormulaEditor item={item} onSubmit={this.updateFormula.bind(this)} />
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
