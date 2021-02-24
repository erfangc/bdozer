import React, { useState } from "react"
import { Item, Model } from "../../client"
import { SmallGhostButton } from "../GhostButton"

interface ItemChooserProps {
    chosenItems: Item[]
    model: Model
    onChange: (chosenItems: Item[]) => void
}

export function ItemChooser({ chosenItems, model: { incomeStatementItems, otherItems }, onChange }: ItemChooserProps) {

    const [open, setOpen] = useState(false)

    function select(item: Item) {
        let newChosenItems = null
        if (chosenItems.includes(item)) {
            newChosenItems = chosenItems.filter(i => i.name !== item.name)
        } else {
            newChosenItems = [...chosenItems, item]
        }
        onChange(newChosenItems)
    }

    return (
        <div className="relative self-end flex" style={{ zIndex: 1 }}>
            <SmallGhostButton onClick={() => setOpen(!open)}>Items to Display</SmallGhostButton>
            {
                open
                    ?
                    <div className="p-6 bg-blueGray-700 rounded-lg shadow-lg mt-2 inline-block absolute top-full -left-1/2 whitespace-nowrap">
                        <p className="text-sm font-bold block mb-4 border-b border-blueGray-400">
                            Income Statement
                        </p>
                        {
                            incomeStatementItems.map(
                                item =>
                                    <div key={item.name} className="text-sm mb-1">
                                        <input
                                            type="checkbox"
                                            name={item.name}
                                            checked={chosenItems.includes(item)}
                                            onChange={() => select(item)}
                                        />
                                        <label className="ml-2">
                                            {item.description ?? item.name}
                                        </label>
                                    </div>
                            )
                        }
                        <p className="text-sm font-bold block mt-6 mb-4 border-b border-blueGray-400">
                            Other Items
                        </p>
                        {
                            otherItems.map(item =>
                                <div key={item.name} className="text-sm mb-1">
                                    <input
                                        type="checkbox"
                                        name={item.name}
                                        checked={chosenItems.includes(item)}
                                        onChange={() => select(item)}
                                    />
                                    <label className="ml-2">
                                        {item.description ?? item.name}
                                    </label>
                                </div>
                            )
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
}