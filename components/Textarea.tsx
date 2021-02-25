import React from "react"

interface TextAreaInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    label?: string
}

export function TextArea({ label, className, ...props }: TextAreaInputProps) {
    return (
        <div className="flex-col flex">
            {label ? <label className="mb-2 text-sm">{label}</label> : null}
            <textarea
                type="text"
                className={`cursor-pointer w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4 ${className}`}
                {...props}
            />
        </div>
    )
}
