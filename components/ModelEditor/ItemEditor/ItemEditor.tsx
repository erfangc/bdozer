import React from "react";
import { Item } from "../../../client";
import { Drivers } from "../Drivers/Drivers";
import { ItemFY0Input } from "./ItemFY0Input";
import { ItemDescriptionInput } from "./ItemDescriptionInput";

interface ItemEditorProps {
    item: Item
}

export function ItemEditor({ item }: ItemEditorProps) {
    return (
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
                <textarea
                    name="expression"
                    rows={3}
                    className="w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                    placeholder="Enter formula"
                />
            </div>
        </div>
    )
}