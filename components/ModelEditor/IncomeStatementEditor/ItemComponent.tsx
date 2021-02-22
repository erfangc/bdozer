import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { Item, Model } from "../../../client"
import { IncomeStatementItemEditor } from "./IncomeStatementItemEditor/IncomeStatementItemEditor"
import { Attention, Check } from "../Svgs"

interface ItemComponentProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

export function ItemComponent({ item, onChange, model }: ItemComponentProps) {

    // TODO fix this
    const checked = item.expression || item.fixedCost || item.saaSRevenue || item.variableCost
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
                open
                    ? <IncomeStatementItemEditor item={item} onChange={onChange} model={model} />
                    : null
            }
        </div>
    )
}
