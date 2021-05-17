import React from 'react';
import {simpleMoney, simpleNumber, simplePercent} from "../../simple-number";
import {Item} from "../../client";
import {KPIContext} from "./KPIReact";

export function KPICard({item, kpiContext: {kpis}}: { item: Item, kpiContext: KPIContext }) {
    const {value, format} = kpis.find(it => it.itemName === item.name)
    const {name, description} = item
    let val = null;

    if (format === 'percent') {
        val = simplePercent(value)
    } else if (format === 'number') {
        val = simpleNumber(value)
    } else if (format === 'money') {
        val = simpleMoney(value)
    }

    return (
        <div className="px-4 py-2 shadow rounded bg-blueGray-800 space-y-1 my-2 w-full">
            <p className="text-sm text-blueGray-300">
                {description ?? name}
            </p>
            <p>{val}</p>
        </div>
    );
}