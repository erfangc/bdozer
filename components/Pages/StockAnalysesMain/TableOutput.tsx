import React, {ReactNode, useState} from "react"
import NumberFormat from "react-number-format"
import {StockAnalysis2} from "../../../client"
import {year} from "../../../year"

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TableOutput(props: Props) {

    const model = props.stockAnalysis.model
    const cells = props.stockAnalysis.cells
    const periods = []

    for (let i = 0; i <= model.periods; i++) {
        periods.push(i)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {periods.map(period => <th className="text-right" key={period}>{year(period)}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {model?.incomeStatementItems?.map(item => {
                        const { name, description, commentaries } = item;
                        return (
                            <tr key={name} className="hover:bg-blueGray-700 cursor-pointer">
                                <td className="pl-2">
                                    <div className="whitespace-nowrap">
                                        <PopoverGeneric trigger={description ?? name}>
                                            <div className="flex flex-col space-y-1">
                                                <h1><b>Item Name:</b> {item.name}</h1>
                                                {commentaries ? <span>{commentaries?.commentary}</span> : null}
                                            </div>
                                        </PopoverGeneric>
                                    </div>
                                </td>
                                {/* For every period layout the prediction for that period */}
                                {periods.map(period => {
                                    const cell = cells.find(cell =>
                                        cell.period == period && cell.item.name == name
                                    )
                                    const className = period > 0 ? null : 'bg-blueGray-500 text-blueGray-50'
                                    return (
                                        <td className={`text-right px-1 py-0.5 ${className}`}>
                                            {
                                                cell.value
                                                    ? <NumberFormat value={cell.value} displayType="text" decimalScale={2} thousandSeparator />
                                                    : null
                                            }
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


interface PopoverProps {
    trigger: ReactNode
    children: ReactNode
}

function PopoverGeneric(props: PopoverProps) {
    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true)
    }
    function hide() {
        setVisible(false)
    }
    return (
        <a className="block relative cursor-pointer" onMouseEnter={show} onMouseLeave={hide}>
            {props.trigger}
            {
                visible
                    ?
                    <div className="mt-1 absolute top-full text-blueGray-50 p-4 border bg-blueGray-900 border-blueGray-500 rounded z-10">
                        {props.children}
                    </div>
                    : null
            }
        </a>
    )
}