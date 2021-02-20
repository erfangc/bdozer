import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Model } from "../../../client";

interface BalanceSheetEditorProps {
    model: Model
    onChange: (newModel: Model) => void
}

export function BalanceSheetEditor({ model, onChange }: BalanceSheetEditorProps) {

    const { balanceSheetItems } = model
    const [open, setOpen] = useState(false)

    return (
        <section className="flex flex-col space-y-12">
            {
                balanceSheetItems.map(item => {
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
                })
            }
        </section>
    )
}

function BalanceSheetItemEditor(props) {
    return null;
}
