import React, {MouseEvent, useState} from 'react';
import {simpleMoney, simpleNumber, simplePercent} from "../../../simple-number";
import {CompanyKPIs, Item, ItemTypeEnum, KPIMetadata, KPIMetadataFormatEnum} from "../../../client";
import {Delete, Plus} from "../../Common/Svgs";

interface Props {
    parent?: Item
    companyKPIs: CompanyKPIs
    period: number
    item: Item
    onAttemptToAddChild: (parent: Item) => void
    onAttemptToAddSibling: () => void
    onAttemptToEdit: (item: Item, kpi: KPIMetadata) => void
    deleteItem: (item: Item) => void
}

export function KPICard(
    {
        parent,
        period,
        onAttemptToAddChild,
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

    function setHoveringTrue() {
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

    function handleOnAttemptToAddChild() {
        onAttemptToAddChild(item)
    }

    function handleClick(event: MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        event.preventDefault();
        const kpi = kpis.find(it => it.itemName === item.name);
        onAttemptToEdit(item, kpi);
    }

    const hasChildren = (
        (item.type === ItemTypeEnum.SumOfOtherItems && item.sumOfOtherItems)
        ||
        (item.type === ItemTypeEnum.ProductOfOtherItems && item.productOfOtherItems)
    );

    return (
        <div
            className="relative w-full my-2"
            onMouseLeave={setHoveringFalse}
            onMouseEnter={setHoveringTrue}
        >
            {
                hasChildren
                    ? null
                    :
                    <div
                        onClick={handleOnAttemptToAddChild}
                        className={`absolute bottom-full left-0 w-32 cursor-pointer mb-1 px-4 py-1 bg-blueGray-800 transition ease-in ${hovering ? 'opacity-80' : 'opacity-0'}`}
                    >
                        <Plus/> <span>Children</span>
                    </div>
            }
            <div
                className="px-4 py-2 shadow rounded bg-blueGray-800 space-y-1 w-full cursor-pointer"
                onClick={handleClick}
            >
                <p className="text-sm text-blueGray-300">
                    {description ?? name}
                </p>
                <p>{val ?? '-'}</p>
            </div>
            {
                parent
                    ?
                    <div
                        className={`absolute space-y-1 z-10 text-white left-full ml-1 mt-1 top-0 transition ease-in ${hovering ? 'opacity-80' : 'opacity-0'}`}>
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
                    : null
            }
        </div>
    );
}
