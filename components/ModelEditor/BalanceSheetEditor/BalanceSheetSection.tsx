import React from "react"
import NumberFormat from "react-number-format"
import { Model, Item } from "../../../client"
import { SmallGhostButton } from "../../GhostButton"
import { DashedLine } from "../Svgs"
import { BalanceSheetItemComponent } from "./BalanceSheetItemComponent"

interface SectionProps {
    model: Model
    items: Item[]
    subtotal: Item
    onChange: (newModel: Model) => void
}

export function BalanceSheetSection({ items, subtotal, onChange, model }: SectionProps) {

    function addItem() {
        //
        // Place the new item 1 line above the subtotal
        //
        const subtotalIdx = model.balanceSheetItems?.findIndex(i => i.name === subtotal.name)

        const name = `Balance_Sheet_Item_${model.balanceSheetItems.length + 1}`
        const newItem: Item = {
            name: name,
            historicalValue: 0,
            description: name.replace(/_/g, " ")
        }

        const updatedItems = [
            ...model.balanceSheetItems?.slice(0, subtotalIdx),
            newItem,
            ...model.balanceSheetItems?.slice(subtotalIdx, model.balanceSheetItems.length)
        ]

        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    return (
        <div className="flex flex-col w-96 space-y-3">
            {items.map(item => <BalanceSheetItemComponent key={item.name} item={item} onChange={onChange} model={model} />)}
            <span className="w-64"><SmallGhostButton onClick={addItem}>Add Item</SmallGhostButton></span>
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

