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
        <div className="flex items-center w-96 justify-between relative">
            <span>{item.description ?? item.name}</span>
            <span
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <NumberFormat
                    className="hover:text-blueGray-400"
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={item.historicalValue}
                />
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
        </div>
    )
}
