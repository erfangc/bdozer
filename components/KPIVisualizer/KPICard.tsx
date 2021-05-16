import React from 'react';
import {simpleMoney, simpleNumber, simplePercent} from "../../simple-number";
import {ItemWrapper} from "./ItemWrapper";

export function KPICard({itemWrapper}: { itemWrapper: ItemWrapper }) {

    let {value, item: {name, description}, format} = itemWrapper;
    let val = null;

    if (format === 'percent') {
        val = simplePercent(value)
    } else if (format === 'number') {
        val = simpleNumber(value)
    } else if (format === 'money') {
        val = simpleMoney(value)
    }

    return (
        <div className="px-6 py-3 shadow rounded bg-blueGray-800 space-y-1 my-2">
            <p className="text-sm text-blueGray-300">
                {description ?? name}
            </p>
            <p>{val}</p>
        </div>
    );
}