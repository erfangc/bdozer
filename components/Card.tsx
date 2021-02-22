import React from "react";
import NumberFormat from "react-number-format";

// Card component
interface CardProps {
    label: any
    value: number
}

export function Card(props: CardProps) {
    return (
        <div className="py-4 px-8 rounded-lg shadow-md bg-blueGray-700 flex-col flex space-y-2">
            <span className="text-xs">{props.label}</span>
            <NumberFormat
                displayType='text'
                className="text-2xl"
                value={props.value}
                decimalScale={1}
                prefix="$"
            />
        </div>
    )
}
// end