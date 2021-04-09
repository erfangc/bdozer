import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

interface NumberInputProps extends NumberFormatProps {
    label?: string
}

export class NumberInput extends React.Component<NumberInputProps> {
    ref = null
    render() {
        const { className, label, ...props } = this.props;
        return (
            <div className="flex-col flex">
                {label ? <label className="mb-2 text-sm">{label}</label> : null}
                <NumberFormat
                    onFocus={() => this.ref.select()}
                    getInputRef={el => this.ref = el}
                    thousandSeparator
                    decimalScale={1}
                    className="outline-none border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded px-3 py-2 cursor-pointer"
                    {...props}
                />
            </div>
        )
    }
}
