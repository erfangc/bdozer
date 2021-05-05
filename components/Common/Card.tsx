import React from "react";
import NumberFormat from "react-number-format";

// Card component
interface CardProps {
    label: any
    value: number
    darker?: boolean
    running?: boolean
    state?: 'danger' | 'good'
}

export function Money(props: CardProps) {
    const { running, state } = props;
    return (
        <div className={`py-4 px-5 rounded shadow-md ${props.darker ? 'bg-blueGray-800' : 'bg-blueGray-700'} flex-col flex space-y-2`}>
            <span className="text-xs">{props.label}</span>
            {
                running
                    ?
                    <div
                        className="h-8 animate-pulse bg-blueGray-500 rounded"
                    >
                    </div>
                    :
                    <NumberFormat
                        displayType='text'
                        className={`text-2xl ${state === 'danger' ? 'text-rose-500' : state === 'good' ? 'text-lime-500' : null}`}
                        value={props.value}
                        decimalScale={1}
                        prefix="$"
                    />
            }
        </div>
    )
}

export function Number(props: CardProps) {
    const { running } = props;
    return (
        <div className="py-4 px-5 rounded shadow-md bg-blueGray-700 flex-col flex space-y-2">
            <span className="text-xs">{props.label}</span>
            {
                running
                    ?
                    <div
                        className="h-8 animate-pulse bg-blueGray-500 rounded"
                    >
                    </div>
                    : <NumberFormat
                        displayType='text'
                        className="text-2xl"
                        value={props.value}
                        decimalScale={2}
                    />
            }
        </div>
    )
}

export function CardPercent(props: CardProps) {
    const { running } = props;
    return (
        <div className="py-4 px-5 rounded shadow-md bg-blueGray-700 flex-col flex space-y-2">
            <span className="text-xs">{props.label}</span>
            {
                running
                    ?
                    <div
                        className="h-8 animate-pulse bg-blueGray-500 rounded"
                    >
                    </div>
                    : <NumberFormat
                        displayType='text'
                        className="text-2xl"
                        value={props.value * 100}
                        decimalScale={2}
                        suffix="%"
                    />
            }
        </div>
    )
}
// end