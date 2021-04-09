import { useRouter } from "next/router"
import React from "react"
import NumberFormat from "react-number-format"
import { Item, StockAnalysis2 } from "../../../../client"
import { BetterPopover } from "../../../Popover"
import { ItemTimeSeries } from "../ItemTimeSeries"
import { Attention as Manual, Check } from "./ItemEditor/Svgs"

interface Props {
    overriden?: boolean
    item: Item
    stockAnalysis: StockAnalysis2
}

export function ItemDisplay(props: Props) {

    const { item, overriden, stockAnalysis } = props
    const router = useRouter()
    const { id } = router.query

    return (
        <div
            className={`flex items-center justify-between relative cursor-pointer`}
        >
            {/* wrap around the outside of the component to simulate a border with negative padding */}
            <div
                onClick={() => router.push(`/control-panel/stock-analyses/${id}/items/${item.name}`)}
                className={`absolute -inset-2 border rounded-lg hover:border-opacity-100 transition ease-linear border-blueGray-600 border-opacity-0 hover:shadow-lg`}
            >
            </div>
            <div className="flex space-x-2">
                <span>{item.description ?? item.name}</span>
                <BetterPopover trigger={<History />}>
                    <ItemTimeSeries result={stockAnalysis} item={item} />
                </BetterPopover>
            </div>
            <span className={`flex items-center space-x-2`}>
                <NumberFormat
                    className="hover:text-blueGray-400"
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={item.historicalValue?.value}
                />
                {!overriden ? <Check /> : <Manual />}
            </span>

        </div>
    )
}


function History() {
    return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
            <path d="M3.3335 6.13333H5.3335V12.6667H3.3335V6.13333ZM7.06683 3.33333H8.9335V12.6667H7.06683V3.33333V3.33333ZM10.8002 8.66666H12.6668V12.6667H10.8002V8.66666Z" fill="#F8FAFC" />
        </svg>
    )
}