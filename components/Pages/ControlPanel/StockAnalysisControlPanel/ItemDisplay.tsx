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
            className={`cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-blueGray-600 rounded-md py-2 px-4`}
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
            <div className="flex justify-start md:justify-end items-center space-x-4">
                {!overriden ? <Check/> : <Manual/>}
                <History {...props}/>
            </div>
        </div>
    )
}

