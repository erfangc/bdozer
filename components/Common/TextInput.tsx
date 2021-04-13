import React, {ChangeEvent, useEffect, useState} from "react"

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
}

interface ManagedTextInputProps extends TextInputProps {
    onInputSubmit: (string) => void
}

export const TextInput = function ({ label, className, ...props }: TextInputProps) {
    return (
        <div className="flex-col flex">
            {
                label
                    ? <label className="mb-2 text-sm">{label}</label>
                    : null
            }
            <input
                type="text"
                className={`focus:outline-none border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded px-3 py-2 ${className}`}
                {...props}
            />
        </div>
    )
}

export const ManagedTextInput = function ({ label, className, value, onInputSubmit, ...props }: ManagedTextInputProps) {

    const [internalValue, setInternalValue] = useState(value)

    function handleChange({currentTarget}: ChangeEvent<HTMLInputElement>) {
        setInternalValue(currentTarget.value)
    }

    function handleInputSubmit() {
        onInputSubmit(internalValue)
    }

    useEffect(() => {
        setInternalValue(value)
    }, [value])

    return (
        <div className="flex-col flex">
            {
                label
                    ? <label className="mb-2 text-sm">{label}</label>
                    : null
            }
            <input
                type="text"
                className={`focus:outline-none border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded px-3 py-2 ${className}`}
                {...props}
                value={internalValue}
                onChange={handleChange}
                onBlur={handleInputSubmit}
            />
        </div>
    )
}