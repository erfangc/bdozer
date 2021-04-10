import {useRouter} from "next/router"
import React from "react"
import NumberFormat from "react-number-format"
import {Item, StockAnalysis2} from "../../../../client"
import {Attention as Manual, Check} from "./ItemEditor/Svgs"
import {History} from "./History";

interface Props {
    overriden?: boolean
    item: Item
    stockAnalysis: StockAnalysis2
}

export function ItemDisplay(props: Props) {

    const {item, overriden} = props
    const router = useRouter()
    const {id} = router.query

    return (
        <div
            className="cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md py-2  bg-blueGray-800 shadow-lg px-4 hover:bg-blueGray-700 transition ease-linear"
            onClick={() => router.push(`/control-panel/stock-analyses/${id}/items/${item.name}`)}
        >
            <div className="flex items-center">
                <span>{item.description ?? item.name}</span>
            </div>
            <div className="flex justify-start md:justify-end items-center">
                <NumberFormat
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={item.historicalValue?.value}
                />
            </div>
            <div className="flex justify-start lg:justify-end items-center space-x-4">
                <History {...props}/>
                {!overriden ? <Check/> : <Manual/>}
            </div>
        </div>
    )
}

