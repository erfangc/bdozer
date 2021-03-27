import { useRef, useState } from "react"
import { Item } from "../../../../client"
import { PrimaryButton } from "../../../PrimaryButton"

export function FormulaEditor({ item, onSubmit }: { item: Item, onSubmit: (string) => void }) {

    const [value, setValue] = useState(item.formula)
    const ref = useRef<HTMLTextAreaElement>(null)

    function focus() {
        ref.current?.select()
    }

    function handleChange({ currentTarget: { value } }: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(value)
    }

    return (
        <div className="flex-col space-y-4">
            <p className="flex items-center">
                <span>Formula</span>
                <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
            </p>
            <textarea
                ref={ref}
                name="expression"
                rows={3}
                value={value}
                onFocus={focus}
                onChange={handleChange}
                className="cursor-pointer w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                placeholder="Enter formula"
            >
            </textarea>
            <PrimaryButton onClick={() => onSubmit(value)}>Confirm &amp; Rerun</PrimaryButton>
        </div>
    )
}