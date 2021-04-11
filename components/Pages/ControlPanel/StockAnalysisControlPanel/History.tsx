import React, {MouseEvent, useState} from 'react'
import {ItemTimeSeries} from "../ItemTimeSeries";
import {Item, StockAnalysis2} from "../../../../client";
import {SecondaryButton} from "../../../Common/SecondaryButton";

interface Props {
    overriden?: boolean
    item: Item
    stockAnalysis: StockAnalysis2
}

export function History({stockAnalysis, item}: Props) {

    const [visible, setVisible] = useState(false)

    function toggle(event: MouseEvent<any>) {
        event.preventDefault()
        event.stopPropagation()
        setVisible(!visible)
    }

    return (
        <div className="relative">
            <a className="focus:outline-none flex flex-col items-center" onClick={toggle}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-blueGray-800 hover:bg-blueGray-600 rounded"
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
                    <div className="fixed inset-0 w-screen h-screen bg-blueGray-900 z-10">
                        <div className="container mx-auto px-2 max-w-xl pt-20">
                            <ItemTimeSeries result={stockAnalysis} item={item}/>
                            <SecondaryButton onClick={toggle} className="mt-4">
                                Dismiss
                            </SecondaryButton>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}
