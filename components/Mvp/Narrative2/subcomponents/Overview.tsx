import React from "react";
import NumberFormat from "react-number-format";
import { StockAnalysis } from "../../../../client";
import { SubTitle, Title } from "../../../Title";
import { Money } from "../Card";

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
        <div className="flex-col space-y-8" id="overview">
            <div className="flex justify-between items-center">
                <div>
                    <span>{name}</span>
                    <div className="flex items-baseline">
                        <Title>{symbol}</Title>
                        <span className="ml-4">Latest Price <span className={currentPrice < targetPrice ? `text-rose-500` : null}>${currentPrice.toFixed(2)}</span></span>
                    </div>
                </div>
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
            </div>
        </div>
    )
}