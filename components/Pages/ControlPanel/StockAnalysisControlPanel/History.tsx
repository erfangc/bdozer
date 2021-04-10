import React, {MouseEvent, useState} from 'react'
import {ItemTimeSeries} from "../ItemTimeSeries";
import {Item, StockAnalysis2} from "../../../../client";

interface Props {
    overriden?: boolean
    item: Item
    stockAnalysis: StockAnalysis2
}

export function History({stockAnalysis, item}: Props) {

    const [visible, setVisible] = useState(false)
    const [coord, setCoord] = useState([0, 0])

    function show(event: MouseEvent<HTMLAnchorElement>) {
        console.log(
            `screen[${event.screenX}, ${event.screenY}]`,
            `client[${event.clientX},${event.clientY}]`,
            `page[${event.pageX}, ${event.pageY}]`,
        )
        setVisible(true)
    }

    function hide() {
        setVisible(false)
    }

    return (
        <>
            <a className="focus:outline-none flex flex-col items-center" onMouseEnter={show} onMouseLeave={hide}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-blueGray-800 rounded"
                >
                    <path
                        d="M3.3335 6.13333H5.3335V12.6667H3.3335V6.13333ZM7.06683 3.33333H8.9335V12.6667H7.06683V3.33333V3.33333ZM10.8002 8.66666H12.6668V12.6667H10.8002V8.66666Z"
                        fill="#F8FAFC"
                    />
                </svg>
            </a>
            {
                visible
                    ?
                    <div
                        className="fixed top-1/2 left-1/2 text-blueGray-50 p-4 border bg-blueGray-900 border-blueGray-500 rounded-md z-100 w-screen lg:w-screen lg:max-w-md">
                        <ItemTimeSeries result={stockAnalysis} item={item}/>
                    </div>
                    :
                    null
            }
        </>
    )
}
