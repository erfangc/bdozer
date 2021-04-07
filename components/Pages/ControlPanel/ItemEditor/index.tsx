import React, { Component } from "react";
import { Item, ItemTypeEnum } from "../../../../client";
import { AutoForm } from "../../../AutoForms/AutoForm";
import { bodyOf, merge, schemaOf } from "../../../AutoForms/Schemas";
import { DeleteButton } from "../../../Common/DeleteButton";
import { SecondaryButton } from "../../../Common/SecondaryButton";
import { Select } from "../../../Common/Select";
import { FormulaEditor } from "./FormulaEditor";
import { ItemDescriptionInput } from "./ItemDescriptionInput";
import { ItemFY0Input } from "./ItemFY0Input";

interface ItemEditorProps {
    item: Item
    onChange: (newItem: Item) => void
    onClear: (item: Item) => void
    onDismiss: () => void
}

/**
 * Shows an editor for the Item but also 
 * can be swapped to edit the Drivers that belong to the Item
 */
export class ItemEditor extends Component<ItemEditorProps> {

    updateDescription(newDescription) {
        const { item, onChange } = this.props;
        onChange({ ...item, description: newDescription })
    }

    updateHistoricalValue(newHistoricalValue) {
        const { item, onChange } = this.props;
        onChange({ ...item, historicalValue: newHistoricalValue })
    }

    updateProperty(newValue: any) {
        const { item, onChange } = this.props;
        const newItem = merge(item, newValue)
        onChange(newItem)
    }

    updateFormula(newFormula: string) {
        const { item, onChange } = this.props;
        const newItem = { ...item, formula: newFormula }
        onChange(newItem)
    }

    updateType(newType: ItemTypeEnum) {
        const { item, onChange } = this.props;
        const newItem: Item = { ...item, type: newType }
        onChange(newItem)
    }

    render() {
        const { item, onClear } = this.props;
        return (
            // outer layer is the overlay
            <div className="w-screen h-screen bg-blueGray-900 fixed inset-0 z-10">
                {/* this inner layer is the actual modal / input */}
                <div className="fixed top-4 left-0 right-0 lg:top-32 lg:left-96 lg:right-96 z-10 bg-blueGray-700 px-2 lg:px-12 py-3 lg:py-8 rounded-lg shadow-md flex-col space-y-8">
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
                        <option value={ItemTypeEnum.Discrete}>Discrete</option>
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
                    <div className="space-x-2">
                        <DeleteButton className="w-24" onClick={() => onClear(item)}>
                            Clear
                        </DeleteButton>
                        <SecondaryButton className="w-24" onClick={this.props.onDismiss}>
                            Dismiss
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        )
    }
}
