import React from "react";
import NumberFormat from "react-number-format";
import { Item } from "../../client";
import { GhostButton } from "../GhostButton";
import { ItemComponent } from "./ItemComponent";
import { DashedLine } from "./Svgs";

interface SectionProps {
    items: Item[]
    subtotal: Item
}

export function Section({ items, subtotal }: SectionProps) {
    return (
        <div className="flex flex-col w-96 space-y-3">
            {items.map(item => <ItemComponent item={item} />)}
            <span className="w-64"><GhostButton>Add Item</GhostButton></span>
            <div className="w-96 flex justify-between text-lg font-bold">
                <span>{subtotal.description ?? subtotal.name}</span>
                <span className="flex">
                    <NumberFormat
                        displayType="text"
                        value={subtotal.historicalValue}
                        thousandSeparator
                        decimalScale={0}
                    />
                    <span className="w-10"></span>
                </span>
            </div>
            <DashedLine />
        </div>
    )
}
