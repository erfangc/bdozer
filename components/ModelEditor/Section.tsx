import React from "react";
import NumberFormat from "react-number-format";
import { Item, Model } from "../../client";
import { GhostButton } from "../GhostButton";
import { ItemComponent } from "./ItemComponent";
import { DashedLine } from "./Svgs";

interface SectionProps {
    model: Model
    items: Item[]
    subtotal: Item
    onChange: (newModel: Model) => void
}

export function Section({ items, subtotal, onChange, model }: SectionProps) {

    function addItem() {
        // place the new item 1 line above the subtotal
        const subtotalIdx = model.items?.findIndex(i => i.name === subtotal.name)
        const newItem: Item = {
            name: `Item_${model.items.length + 1}`,
            historicalValue: 0,
            description: `Item_${model.items.length + 1}`.replace("_", " ")
        }
        const updatedItems = [
            ...model.items?.slice(0, subtotalIdx),
            newItem,
            ...model.items.slice(subtotalIdx, model.items.length)
        ]
        onChange({ ...model, items: updatedItems })
    }

    return (
        <div className="flex flex-col w-96 space-y-3">
            {items.map(item => <ItemComponent key={item.name} item={item} onChange={onChange} model={model} />)}
            <span className="w-64"><GhostButton onClick={addItem}>Add Item</GhostButton></span>
            <div className="w-96 flex justify-between text-lg font-bold">
                <span>{subtotal.description ?? subtotal.name}</span>
                <span className="flex">
                    <NumberFormat
                        displayType="text"
                        value={subtotal.historicalValue}
                        thousandSeparator
                        decimalScale={0}
                    />
                    <span className="w-10"></span>
                </span>
            </div>
            <DashedLine />
        </div>
    )
}
