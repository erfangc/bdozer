import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

interface NumberInputProps extends NumberFormatProps {
    label?: string
}

export function NumberInput({ className, label, ...props }: NumberInputProps) {
    return (
        <div className="flex-col flex">
            {label ? <label className="mb-2 text-sm">{label}</label> : null}
            <NumberFormat
                thousandSeparator
                decimalScale={1}
                className="outline-none border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2"
                {...props}
            />
        </div>
    )
}