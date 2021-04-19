import React from "react"
import NumberFormat from "react-number-format"

interface CardProps {
    title: string
    value: number
}

export function Money(props: CardProps) {
    return (
        <div className="flex-col flex space-y-1 shadow-lg px-4 py-2 bg-blueGray-700 rounded">
            <span className="font-semibold text-lg">{props.title}</span>
            <NumberFormat className="font-light" value={props.value} displayType="text" prefix="$" decimalScale={2} />
        </div>
    )
}

export function Number(props: CardProps) {
    return (
        <div className="flex-col flex space-y-1 shadow-lg px-4 py-2 bg-blueGray-700 rounded">
            <span className="font-semibold text-lg">{props.title}</span>
            <NumberFormat className="font-light" value={props.value} displayType="text" decimalScale={2} />
        </div>
    )
}

export function Percent(props: CardProps) {
    return (
        <div className="flex-col flex space-y-1 shadow-lg px-4 py-2 bg-blueGray-700 rounded">
            <span className="font-semibold text-lg">{props.title}</span>
            <NumberFormat className="font-light" value={props.value * 100} displayType="text" suffix="%" decimalScale={1} />
        </div>
    )
}