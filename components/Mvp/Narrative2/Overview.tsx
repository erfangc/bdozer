import React from "react";
import NumberFormat from "react-number-format";
import { StockAnalysis } from "../../../client";
import { SubTitle } from "../../Title";
import { Money } from "./Card";

interface Props {
    result: StockAnalysis
}

export function Overview(props: Props) {
    const {
        result,
        result: {
            model: { symbol, name },
            currentPrice,
            targetPrice,
        }
    } = props;
    const upside = (targetPrice / currentPrice - 1) * 100;
    return (
        <div className="flex-col space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <span className="font-extralight">Company Trading Symbol</span>
                    <SubTitle>{symbol}</SubTitle>
                </div>
                <span>{name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between shadow-lg px-4 py-2 bg-blueGray-700 rounded-md">
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">Target Price</span>
                        <div>
                            <NumberFormat className="font-light" value={targetPrice} displayType="text" prefix="$" decimalScale={2} />
                            <span className={`text-xs ml-3 ${upside > 0 ? 'text-lime-400' : 'bg-rose-500'} font-bold`}>
                                {upside.toFixed(1)}% <span className="font-normal">Upside</span>
                            </span>
                        </div>
                    </div>
                </div>
                <Money title="Current Price" value={currentPrice} />
            </div>
        </div>
    )
}