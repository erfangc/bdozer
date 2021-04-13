import { useRouter } from "next/router"
import React, {useState} from "react"
import NumberFormat from "react-number-format"
import { useFactBaseUnsecured } from "../../../../api-hooks"
import {Fact, Item, StockAnalysis2} from "../../../../client"
import { SmallGhostButton } from "../../../Common/GhostButton"
import { ItemDisplayDetail } from "./ItemDisplayDetail"
import { Attention as Manual, Check, Nothing } from "./ItemEditor/Svgs"
import {Info} from "./Toolbar/Svgs";
import {Popover} from "../../../Popover";

interface Props {
    item: Item
    stockAnalysis: StockAnalysis2
}

export function ItemDisplay(props: Props) {

    const { item: originalItem, stockAnalysis } = props
    const router = useRouter()
    const { id } = router.query
    const factBase = useFactBaseUnsecured()
    const overriddenItem = stockAnalysis.model.itemOverrides.find(i => i.name === props.item.name)
    const overridden = overriddenItem !== undefined
    const item = overriddenItem ?? originalItem
    const factId = item.historicalValue?.factId

    async function openSourceDocument(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        event.stopPropagation()
        const { data: fact } = await factBase.getFact(factId)
        window.open(fact.sourceDocument)
    }

    return (
        <div
            className={`cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded py-2 ${item.subtotal ? '' : 'bg-blueGray-800'} shadow-lg px-4 hover:bg-blueGray-700 transition ease-linear`}
            onClick={() => router.push(`/control-panel/stock-analyses/${id}/items/${item.name}`)}
        >
            <div className="flex items-center">
                <span className={item.subtotal ? 'font-extrabold' : ''}>
                    {item.description ?? item.name}
                </span>
            </div>
            <div className="flex justify-start md:justify-end items-center">
                <NumberFormat
                    className={item.subtotal ? 'font-extrabold' : ''}
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={item.historicalValue?.value}
                />
            </div>
            <div className="flex justify-start lg:justify-end items-center space-x-4">
                <SmallGhostButton onClick={openSourceDocument}>Source</SmallGhostButton>
                <ItemDisplayDetail {...props} />
                {item.subtotal ? <Nothing /> : !overridden ? <Check /> : <Manual />}
            </div>
        </div>
    )
}

