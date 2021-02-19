import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { Item } from "../../client"
import { ItemEditor } from "./ItemEditor/ItemEditor"
import { Attention, Check } from "./Svgs"

export function ItemComponent({ item }: { item: Item }) {

    const checked = item.drivers?.length > 0 || item.expression
    const [open, setOpen] = useState(false)

    return (
        <div className="flex items-center w-96 justify-between relative">
            <span>{item.description ?? item.name}</span>
            <span className="flex items-center space-x-2 cursor-pointer" onClick={() => setOpen(!open)}>
                <NumberFormat
                    className="hover:text-blueGray-400"
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={item.historicalValue}
                />
                {checked ? <Check /> : <Attention />}
            </span>
            {
                open ?
                    <ItemEditor item={item} /> : null
            }
        </div>
    )
}
