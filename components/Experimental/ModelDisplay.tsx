import React from "react"
import NumberFormat from "react-number-format"
import { EvaluateModelResult, Model } from "../../client"

interface Props {
    result: EvaluateModelResult
}

export function ModelResult(props: Props) {
    const model = props.result.model
    const cells = props.result.cells
    const periods = [0, 1, 2, 3, 4, 5]
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
                    {model?.incomeStatementItems?.map(({ name, description, historicalValue }) => {
                        return (
                            <tr key={name}>
                                <td>
                                    <div className="w-64 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {description ?? name}
                                    </div>
                                </td>
                                {/* for every period layout the prediction for that period */}
                                {periods.map(period => {
                                    const cell = cells.find(cell =>
                                        cell.period == period && cell.item.name == name)
                                    const className = period > 0 ? null : 'bg-blueGray-500 text-blueGray-50'
                                    return (
                                        <td className={`text-right px-1 py-0.5 ${className}`}>
                                            {
                                                cell.value ? <NumberFormat
                                                    displayType="text"
                                                    value={cell.value}
                                                    thousandSeparator
                                                /> : null
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