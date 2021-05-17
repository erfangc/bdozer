import React, {useState} from 'react';
import {simpleMoney, simpleNumber, simplePercent} from "../../simple-number";
import {CompanyKPIs, Item, KPIMetadataFormatEnum} from "../../client";
import {Plus} from "../Common/Svgs";

interface Props {
    companyKPIs: CompanyKPIs
    period: number
    item: Item
    onAttemptToAddSibling: () => void
}

export function KPICard({period, onAttemptToAddSibling, item, companyKPIs: { kpis, cells }}: Props) {

    /*
    Find the KPI to display
     */
    const {format} = kpis.find(it => it.itemName === item.name)
    const {name, description} = item
    const [hovering, setHovering] = useState(false)

    function setHoverngTrue() {
        setHovering(true)
    }

    function setHoveringFalse() {
        setHovering(false)
    }

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
        <div
            className="px-4 py-2 shadow rounded bg-blueGray-800 space-y-1 my-2 w-full relative"
            onMouseLeave={setHoveringFalse}
            onMouseEnter={setHoverngTrue}
        >
            <p className="text-sm text-blueGray-300">
                {description ?? name}
            </p>
            <p>{val ?? '-'}</p>
            <button
                className={`absolute focus:outline-none left-full ml-0.5 top-0 bg-blueGray-600 transition cursor-pointer ${hovering ? 'opacity-70' : 'opacity-0'} hover:opacity-100`}
                onClick={onAttemptToAddSibling}
            >
                <Plus size={32}/>
            </button>
        </div>
    );
}