import React from 'react';
import {StockAnalysis2} from "../../../../client";
import {year} from "../../../../year";
import {readableMoney, readableNumber} from "../../../../number-formatters";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function EpsTable(props: Props) {
    return (
        <>
            <Desktop {...props}/>
            <Mobile {...props}/>
        </>
    );
}

function Desktop(props: Props) {

    const {
        stockAnalysis: {
            model: {
                epsConceptName,
                netIncomeConceptName,
                sharesOutstandingConceptName,
            },
            cells,
        }
    } = props;

    return (
        <div className="px-6 py-4 bg-deepNavy-100 hidden lg:block">
            <table className="w-full">
                <thead>
                <tr className="label-small lg:label-regular border-b">
                    <th className="text-left pb-4 w-24 px-2">Year</th>
                    <th className="text-left pb-4 px-2">Net Income</th>
                    <th/>
                    <th className="text-left pb-4 px-2">Number of Shares</th>
                    <th/>
                    <th className="text-left pb-4 px-2">EPS</th>
                </tr>
                </thead>
                <tbody className="numbers-medium">
                {range(0, props.stockAnalysis.model.periods).map(period => {
                    const netIncomeLoss = cells.find(cell => cell.period == period && cell.item?.name === netIncomeConceptName)?.value
                    const sharesOutstanding = cells.find(cell => cell.period == period && cell.item?.name === sharesOutstandingConceptName)?.value
                    const eps = cells.find(cell => cell.period == period && cell.item?.name === epsConceptName)?.value
                    return (
                        <tr key={period}>
                            <td className="text-left px-2 py-2">{year(period)}</td>
                            <td className="text-left px-2 py-2">{readableMoney(netIncomeLoss)}</td>
                            <td className="text-left px-2">÷</td>
                            <td className="text-left px-2">{readableNumber(sharesOutstanding)}</td>
                            <td className="text-left px-2">=</td>
                            <td className="text-left text-lime-100 px-2">{readableMoney(eps)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

function Mobile(props: Props) {

    const {
        stockAnalysis: {
            model: {
                epsConceptName,
                netIncomeConceptName,
                sharesOutstandingConceptName,
            },
            cells,
        }
    } = props;

    return (
        <div className="px-6 py-4 bg-deepNavy-100 lg:hidden">
            <table className="w-full">
                <thead>
                <tr className="label-small lg:label-regular border-b">
                    <th className="text-left pb-4 w-24 px-2">Year</th>
                    <th className="text-left pb-4 px-2">Net Income</th>
                    <th/>
                    <th className="text-left pb-4 px-2">Number of Shares</th>
                    <th/>
                    <th className="text-left pb-4 px-2">EPS</th>
                </tr>
                </thead>
                <tbody className="numbers-micro">
                {range(0, props.stockAnalysis.model.periods).map(period => {
                    const netIncomeLoss = cells.find(cell => cell.period == period && cell.item?.name === netIncomeConceptName)?.value
                    const sharesOutstanding = cells.find(cell => cell.period == period && cell.item?.name === sharesOutstandingConceptName)?.value
                    const eps = cells.find(cell => cell.period == period && cell.item?.name === epsConceptName)?.value
                    return (
                        <tr key={period}>
                            <td className="text-left px-2 py-2">{year(period)}</td>
                            <td className="text-left px-2 py-2">{readableMoney(netIncomeLoss)}</td>
                            <td className="text-left px-2">÷</td>
                            <td className="text-left px-2">{readableNumber(sharesOutstanding)}</td>
                            <td className="text-left px-2">=</td>
                            <td className="text-left text-lime-100 px-2">{readableMoney(eps)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

function range(start: number, end: number) {
    let ret = []
    for (let i = start; i <= end; i++) {
        ret.push(i)
    }
    return ret
}