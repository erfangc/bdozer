import React from "react";
import { Item, Model } from "../../../client";
import { Drivers } from "../Drivers/Drivers";
import { ItemFY0Input } from "./ItemFY0Input";
import { ItemDescriptionInput } from "./ItemDescriptionInput";
import { DeleteButton } from "../../DeleteButton";

interface ItemEditorProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

export function ItemEditor({ model, item, onChange }: ItemEditorProps) {

    function updateDescription(newDescription) {
        // TODO validate the new description
        const updatedItems = model.items?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, description: newDescription }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, items: updatedItems })
    }

    function updateHistoricalValue(newHistoricalValue) {
        // TODO validate the new description
        const updatedItems = model.items?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, historicalValue: newHistoricalValue }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, items: updatedItems })
    }

    function deleteItem() {
        const updatedItems = model.items?.filter(i => i.name !== item.name)
        onChange({ ...model, items: updatedItems })
    }

    return (
        <div className="absolute top-0 left-full ml-4 bg-blueGray-800 px-20 py-8 rounded-lg shadow-md flex-col space-y-8">
            <div className="flex-col space-y-4">
                <ItemDescriptionInput item={item} onChange={updateDescription} />
                <ItemFY0Input item={item} onChange={updateHistoricalValue} />
            </div>
            <Drivers />
            <div className="flex-col space-y-4">
                <p className="flex items-center">
                    <span>Formula</span>
                    <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
                </p>
                <textarea
                    name="expression"
                    rows={3}
                    className="w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                    placeholder="Enter formula"
                />
            </div>
            <DeleteButton onClick={deleteItem}>Delete Item</DeleteButton>
        </div>
    )
}