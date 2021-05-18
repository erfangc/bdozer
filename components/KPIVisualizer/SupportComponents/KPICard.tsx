import React, {useState, MouseEvent} from 'react';
import {simpleMoney, simpleNumber, simplePercent} from "../../../simple-number";
import {CompanyKPIs, Item, KPIMetadata, KPIMetadataFormatEnum} from "../../../client";
import {Delete, Plus} from "../../Common/Svgs";

interface Props {
    companyKPIs: CompanyKPIs
    period: number
    item: Item
    onAttemptToAddSibling: () => void
    onAttemptToEdit: (item: Item, kpi: KPIMetadata) => void
    deleteItem: (item: Item) => void
}

export function KPICard(
    {
        period,
        onAttemptToAddSibling,
        onAttemptToEdit,
        deleteItem,
        item,
        companyKPIs: {kpis, cells},
    }: Props
) {

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

    function handleDelete() {
        deleteItem(item);
    }

    function handleClick(event: MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        event.preventDefault();
        const kpi = kpis.find(it => it.itemName === item.name);
        onAttemptToEdit(item, kpi);
    }

    return (
        <div
            className="px-4 py-2 shadow rounded bg-blueGray-800 space-y-1 my-2 w-full relative cursor-pointer"
            onMouseLeave={setHoveringFalse}
            onMouseEnter={setHoverngTrue}
            onClick={handleClick}
        >
            <div className={`absolute bottom-full left-0 px-4 py-1 bg-blueGray-800 transition ease-in ${hovering ? 'opacity-70' : 'opacity-0'}`}>
                <Plus/> <span>Children</span>
            </div>
            <p className="text-sm text-blueGray-300">
                {description ?? name}
            </p>
            <p>{val ?? '-'}</p>
            <div
                className={`absolute space-y-1 text-white left-full ml-0.5 top-0 transition  ease-in ${hovering ? 'opacity-70' : 'opacity-0'}`}>
                <button
                    className={`focus:outline-none bg-blueGray-800 cursor-pointer rounded`}
                    onClick={onAttemptToAddSibling}
                >
                    <Plus/>
                </button>
                <button
                    className={`focus:outline-none bg-rose-500 cursor-pointer rounded`}
                    onClick={handleDelete}
                >
                    <Delete/>
                </button>
            </div>
        </div>
    );
}
