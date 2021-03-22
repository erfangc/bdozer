import React from "react";
import NumberFormat from "react-number-format";
import { Item, Model } from "../../../client";
import { SmallGhostButton } from "../../GhostButton";
import { IncomeStatementItemComponent } from "./IncomeStatementItemComponent";
import { DashedLine } from "../Svgs";

interface SectionProps {
    model: Model
    items: Item[]
    subtotal: Item
    onChange: (newModel: Model) => void
}

export function IncomeStatementSection({ items, subtotal, onChange, model }: SectionProps) {

    function addItem() {
        //
        // Place the new item 1 line above the subtotal
        //
        const subtotalIdx = model.incomeStatementItems?.findIndex(i => i.name === subtotal.name)

        const newItem: Item = {
            name: `Item_${model.incomeStatementItems.length + 1}`,
            description: `Item_${model.incomeStatementItems.length + 1}`.replace("_", " ")
        }

        const updatedItems = [
            ...model.incomeStatementItems?.slice(0, subtotalIdx),
            newItem,
            ...model.incomeStatementItems?.slice(subtotalIdx, model.incomeStatementItems.length)
        ]

        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    return (
        <div className="flex flex-col w-96 space-y-3">
            {items.map(item => <IncomeStatementItemComponent key={item.name} item={item} onChange={onChange} model={model} />)}
            <span className="w-64"><SmallGhostButton onClick={addItem}>Add Item</SmallGhostButton></span>
            <div className="w-96 flex justify-between text-lg font-bold">
                <span>{subtotal.description ?? subtotal.name}</span>
                <span className="flex">
                    <NumberFormat
                        displayType="text"
                        value={subtotal.historicalValue?.value}
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
