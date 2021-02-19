import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { Item } from "../../client"
import { PrimaryButton } from "../PrimaryButton"
import { Drivers } from "./Drivers/Drivers"
import { ItemDescriptionInput } from "./ItemDescriptionInput"
import { ItemFY0Input } from "./ItemFY0Input"
import { Check, Attention } from "./Svgs"

export function ItemComponent({ item }: { item: Item }) {

    const checked = item.drivers?.length > 0 || item.expression
    const [open, setOpen] = useState(false)

    return (
        <div className="flex items-center w-96 justify-between cursor-pointer relative">
            <span>{item.description ?? item.name}</span>
            <span className="flex items-center space-x-2" onClick={() => setOpen(!open)}>
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
                    (
                        <div className="absolute top-0 left-full ml-4 bg-blueGray-800 px-20 py-8 rounded-lg shadow-md flex-col space-y-8">
                            <div className="flex-col space-y-4">
                                <ItemDescriptionInput item={item} />
                                <ItemFY0Input item={item} />
                            </div>
                            <Drivers />
                            <div className="flex-col space-y-4">
                                <p className="flex items-center">
                                    <span>Formula</span>
                                    <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
                                </p>
                                <textarea name="expression" rows={3} className="w-full rounded-sm bg-blueGray-900 border-blueGray-500"></textarea>
                            </div>
                        </div>
                    ) : null
            }
        </div>
    )
}


