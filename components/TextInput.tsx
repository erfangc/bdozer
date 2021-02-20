import React from "react"
import NumberFormat, { NumberFormatProps } from "react-number-format"

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
}

export function TextInput({ label, className, ...props }: TextInputProps) {
    return (
        <div className="flex-col flex">
            {label ? <label className="mb-2 text-sm">{label}</label> : null}
            <input
                type="text"
                className={`outline-none border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2 ${className}`}
                {...props}
            />
        </div>
    )
}
