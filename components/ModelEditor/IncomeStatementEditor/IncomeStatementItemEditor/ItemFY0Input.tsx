import React, { useRef, useState } from "react";
import NumberFormat from "react-number-format";
import { Item } from "../../../../client";

export function ItemFY0Input(props: { item: Item, onChange: (newValue) => void }) {
    const { item, onChange } = props;
    const [value, setValue] = useState(item.historicalValue)
    return (
        <div className="flex-col flex w-48">
            <label htmlFor={item.name} className="mb-2 text-sm">FY0 (Historical Value)</label>
            <NumberFormat
                thousandSeparator
                decimalScale={1}
                name={item.name}
                value={value}
                placeholder="ex: Commercial Aircraft"
                onValueChange={({ floatValue }) => setValue(floatValue)}
                onBlur={() => onChange(value)}
                className="border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2"
            />
        </div>
    )
}