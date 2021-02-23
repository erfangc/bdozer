import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { Item, Model } from "../../../client"
import { BalanceSheetItemEditor } from "./BalanceSheetItemEditor"

interface BalanceSheetItemComponentProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

export function BalanceSheetItemComponent({ model, item, onChange }: BalanceSheetItemComponentProps) {
    const [open, setOpen] = useState(false)
    return (
        <p className="text-lg text-blueGray-400 flex w-96 font-bold justify-between">
            <span>{item.description ?? item.name}</span>
            <span className="flex">
                <NumberFormat
                    displayType="text"
                    value={item.historicalValue}
                    thousandSeparator
                    decimalScale={0}
                />
                <span className="w-10"></span>
            </span>
            {
                open
                    ? <BalanceSheetItemEditor
                        item={item}
                        onChange={onChange}
                        model={model}
                    />
                    : null
            }
        </p>
    )
}
