import React from 'react';
import {simpleMoney, simpleNumber, simplePercent} from "../../simple-number";
import {CompanyKPIs, Item, KPIMetadataFormatEnum} from "../../client";

interface Props {
    companyKPIs: CompanyKPIs
    period: number
    item: Item
}

export function KPICard({period, item, companyKPIs: { kpis, cells }}: Props) {

    /*
    Find the KPI to display
     */
    const {format} = kpis.find(it => it.itemName === item.name)
    const {name, description} = item

    const cell = cells.find(cell => cell.item.name === item.name && cell.period === period)

    let val = null;

    if (cell) {
        if (format === KPIMetadataFormatEnum.Percent) {
            val = simplePercent(cell.value)
        } else if (format === KPIMetadataFormatEnum.Number) {
            val = simpleNumber(cell.value)
        } else if (format === KPIMetadataFormatEnum.Money) {
            val = simpleMoney(cell.value)
        }
    }

    return (
        <div className="px-4 py-2 shadow rounded bg-blueGray-800 space-y-1 my-2 w-full">
            <p className="text-sm text-blueGray-300">
                {description ?? name}
            </p>
            <p>{val ?? '-'}</p>
        </div>
    );
}