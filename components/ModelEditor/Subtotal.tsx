import React from "react";
import NumberFormat from "react-number-format";
import { Item } from "../../client";

interface SubtotalProps {
    subtotal: Item
}

export function Subtotal({ subtotal }: SubtotalProps) {
    return (
        <p className="text-lg text-blueGray-400 flex w-96 font-bold justify-between">
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
        </p>
    )
}