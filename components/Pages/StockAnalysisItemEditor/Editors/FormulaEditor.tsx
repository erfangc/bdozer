import React, {ChangeEvent} from "react"
import {Item, ItemTypeEnum} from "../../../../client"

interface Props {
    item: Item
    onSubmit: (item: Item) => void
}

export function FormulaEditor({item, onSubmit}: Props) {

    function handleChange({currentTarget: {value}}: ChangeEvent<HTMLTextAreaElement>) {
        onSubmit({...item, type: ItemTypeEnum.Custom, formula: value})
    }

    return (
        <div className="flex-col space-y-4">
            <p className="text-sm">
                Formula
            </p>
            <textarea
                autoFocus
                name="expression"
                value={item.formula}
                onFocus={focus}
                onChange={handleChange}
                className="cursor-pointer w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                placeholder="Enter formula"
            >
            </textarea>
        </div>
    )
}