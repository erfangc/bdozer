import React, {useState} from "react";
import NumberFormat from "react-number-format";
import {basePath} from "../../../../api-hooks";
import {StockAnalysis2} from "../../../../client";
import {Title} from "../../../Common/Title";
import {TrendingDown, TrendingUp} from "../../../Common/Svgs";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function Overview(props: Props) {
    const {
        stockAnalysis: {
            lastUpdated,
            ticker,
            name,
            derivedStockAnalytics: {
                currentPrice,
                targetPrice,
            }
        }
    } = props;

    const upside = (targetPrice / currentPrice - 1) * 100;

    const [loading, setLoading] = useState(false)

    const underValued = upside > 0;
    return (
        <section id="overview" className="space-y-4">
            <div className="flex justify-between items-start">
                <div className="flex-col flex space-y-2">
                    <span className="text-blueGray-300 uppercase">{name}</span>
                    <Title>{ticker}</Title>
                </div>
                <div className="text-xs text-blueGray-400">
                    <h4>Last Updated</h4>
                    <p>{new Date(lastUpdated).toLocaleString()}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between shadow px-6 py-4 bg-blueGray-700 rounded">
                    <div>
                        <span className="text-sm">Fair Value</span>
                        <div>
                            <NumberFormat className="text-2xl font-bold" value={targetPrice} displayType="text" prefix="$" decimalScale={2} />
                            <div className={`${underValued ? 'text-lime-400' : 'text-rose-500'} font-bold`}>
                                {underValued ? '+' : ''}{upside.toFixed(1)}% <span className="font-normal">{underValued ? 'Upside' : 'Downside'}</span>
                            </div>
                        </div>
                    </div>
                    {
                        underValued
                            ? <TrendingUp className="text-lime-400 h-10 w-10"/>
                            : <TrendingDown className="text-rose-500 h-10 w-10"/>
                    }
                </div>
                <div className="flex flex-col justify-between shadow px-6 py-4 bg-blueGray-700 rounded">
                    <span className="text-sm">Current Price</span>
                    <NumberFormat className="text-2xl font-bold" value={currentPrice} displayType="text" prefix="$" decimalScale={2} />
                    <div>&nbsp;</div>
                </div>
            </div>
        </section>
    )
}
