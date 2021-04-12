import { useState } from "react"
import { Item } from "../../../../../client"
import { PrimaryButton } from "../../../../Common/PrimaryButton"

export function FormulaEditor({ item, onSubmit }: { item: Item, onSubmit: (string) => void }) {

    const [value, setValue] = useState(item.formula)

    function handleChange({ currentTarget: { value } }: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(value)
    }

    return (
        <div className="flex-col space-y-4">
            <p className="text-sm">
                Formula
            </p>
            <textarea
                name="expression"
                value={value}
                onFocus={focus}
                autoFocus
                onChange={handleChange}
                className="cursor-pointer w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                placeholder="Enter formula"
            >
            </textarea>
            <PrimaryButton onClick={() => onSubmit(value)}>Confirm</PrimaryButton>
        </div>
    )
}