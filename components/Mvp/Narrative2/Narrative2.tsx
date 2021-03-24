
import HighchartsReact from "highcharts-react-official";
import React from "react";
import NumberFormat from "react-number-format";
import { ModelResult } from "../../../client"
import { highcharts } from "../../../highcharts";
import { SubTitle } from "../../Title";
import { ProfitWaterFall } from "./ProfitWaterFall"
import { ValueBreakdown } from "./ValueBreakdown";

interface Props {
    result: ModelResult
}

export function Narrative2(props: Props) {
    const {
        result,
        result: {
            cells,
            model,
            currentPrice,
            targetPrice,
        }
    } = props;

    return (
        <main className="text-blueGray-50 flex-grow min-h-screen px-2 py-8 flex justify-center bg-blueGray-900">
            <div className="max-w-lg">
                <div className="grid grid-cols-2 gap-2">
                    <Card title="Target Price" value={targetPrice} />
                    <Card title="Current Price" value={currentPrice} />
                </div>
                <div>
                    <ValueBreakdown result={result} />
                </div>
                <div>
                    <SubTitle className="mb-4">Business Breakdown</SubTitle>
                    <p>How did AAL make and spend it's money in the most recent year</p>
                    <ProfitWaterFall result={result} />
                </div>
            </div>
        </main>
    )
}

interface CardProps {
    title: string
    value: number
}

function Card(props: CardProps) {
    return (
        <div className="flex-col flex space-y-1 shadow-lg px-4 py-2 bg-blueGray-700 rounded-md">
            <span className="font-semibold text-lg">{props.title}</span>
            <NumberFormat className="font-light" value={props.value} displayType="text" prefix="$" decimalScale={2} />
        </div>
    )
}