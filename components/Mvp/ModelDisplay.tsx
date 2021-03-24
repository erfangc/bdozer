import React, { useState } from "react"
import { ReactNode } from "react"
import NumberFormat from "react-number-format"
import { EvaluateModelResult } from "../../client"

interface Props {
    result: EvaluateModelResult
}

export function ModelResult(props: Props) {
    const model = props.result.model
    const cells = props.result.cells
    const periods = []

    for (let i = 0; i <= model.periods; i++) {
        periods.push(i)
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {periods.map(period => <th className="text-right" key={period}>FY{period}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {model?.incomeStatementItems?.map(({ name, description, commentaries }) => {
                        return (
                            <tr key={name}>
                                <td>
                                    <div className="whitespace-nowrap">
                                        {!!commentaries ? <PopoverGeneric trigger={description ?? name}>
                                            <span>{commentaries?.commentary}</span>
                                        </PopoverGeneric> : description ?? name}
                                    </div>
                                </td>
                                {/* for every period layout the prediction for that period */}
                                {periods.map(period => {
                                    const cell = cells.find(cell =>
                                        cell.period == period && cell.item.name == name
                                    )
                                    const className = period > 0 ? null : 'bg-blueGray-500 text-blueGray-50'
                                    return (
                                        <td className={`text-right px-1 py-0.5 ${className}`}>
                                            {
                                                cell.value ?
                                                    <NumberFormat
                                                        displayType="text"
                                                        value={cell.value}
                                                        thousandSeparator
                                                        decimalScale={0}
                                                    />
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
        </>
    )
}


interface PopoverProps {
    trigger: ReactNode
    children: ReactNode
}

export function PopoverGeneric(props: PopoverProps) {
    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true)
    }
    function hide() {
        setVisible(false)
    }
    return (
        <a className="block relative cursor-pointer underline" onMouseEnter={show} onMouseLeave={hide}>
            {props.trigger}
            {
                visible
                    ?
                    <div className="absolute top-full text-blueGray-50 p-4 border bg-blueGray-900 border-blueGray-500 rounded-md z-10">
                        {props.children}
                    </div>
                    : null
            }
        </a>
    )
}