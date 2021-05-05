import React from "react";
import NumberFormat, {NumberFormatProps} from "react-number-format";

interface NumberInputProps extends NumberFormatProps {
    label?: string
}

interface State {
    value: any
}

export class NumberInput extends React.Component<NumberInputProps, State> {

    constructor(props: NumberInputProps) {
        super(props);
        this.state = {value: props.value}
    }

    render() {
        const {className, label, disabled, ...props} = this.props;
        const {value} = this.state;

        return (
            <div className="flex-col flex">
                {label ? <label className="mb-2 text-sm">{label}</label> : null}
                <NumberFormat
                    thousandSeparator
                    decimalScale={1}
                    className={`outline-none border border-blueGray-500 text-blueGray-50 rounded px-3 py-2 cursor-pointer ${disabled ? 'bg-blueGray-600 cursor-not-allowed' : 'bg-blueGray-900'}`}
                    value={value}
                    onClick={e => e.currentTarget.select()}
                    disabled={disabled}
                    onValueChange={({floatValue}) => this.setState({value: floatValue})}
                    {...props}
                />
            </div>
        )
    }
}
