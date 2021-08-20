import React, {useEffect, useState} from 'react';
import {StockAnalysis2} from "../../../../client";
import Scrollspy from "react-scrollspy";
import {MobileWatchButton} from "../Overview/WatchingButton/WatchingButton";
import {upside} from "../upside";
import {commafy, readablePercent} from "../../../../number-formatters";
import {DownloadToExcel} from "../Overview/DownloadToExcel";
import {ShareAnalysisButton} from "../Overview/ShareAnalysisButton";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function StatsPanel({stockAnalysis}: Props) {

    const {ticker, name, lastUpdated, derivedStockAnalytics: {currentPrice, finalPrice}} = stockAnalysis;
    const upsideP = upside(stockAnalysis);

    // once we've scrolled pass the div with id = 'top-level-stats' render a stats panel
    const [showStatsPanel, setShowStatsPanel] = useState(false);

    useEffect(() => {
        const listener = ev => {
            // show stats panel if we've scrolled passed the
            // div with identifier 'top-level-stats'
            const topStats = document.getElementById('top-level-stats');
            const statsTransitionPoint = topStats.offsetHeight + topStats.offsetTop + 100;
            if (window.window.scrollY > statsTransitionPoint) {
                setShowStatsPanel(true);
            } else {
                setShowStatsPanel(false);
            }
        };
        window.window.addEventListener('scroll', listener);
        return () => {
            window.window.removeEventListener('scroll', listener);
        }
    }, []);

    return (
        <div
            className={`overflow-hidden transition-all duration-500 ease-linear ${showStatsPanel ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="bg-navy-100 rounded p-4 mb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="heading2 text-lime-100">{ticker}</h2>
                        <h5 className="heading5 text-gray-2">{name}</h5>
                    </div>
                    <MobileWatchButton stockAnalysis={stockAnalysis}/>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="text-xs leading-4 text-lightGreen-25 hidden lg:block">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </div>
                </div>
                <div className="mt-6">
                    <h1 className="numbers-large text-lime-100">{readablePercent(upsideP)}</h1>
                    <div className="flex justify-between text-gray-2 mt-4">
                        <div>
                            <span className="label-small">Forecast Price</span>
                            <p className="numbers-regular">${commafy(finalPrice)}</p>
                        </div>
                        <div>
                            <span className="label-small">Current Price</span>
                            <p className="numbers-regular">${commafy(currentPrice)}</p>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-4 hidden lg:flex">
                    <DownloadToExcel stockAnalysis={stockAnalysis}/>
                    <ShareAnalysisButton stockAnalysis={stockAnalysis}/>
                </div>
            </div>
        </div>
    );
}

export function TableOfContent({stockAnalysis}: Props) {

    const items = [
        "overview",
        "business-summary",
        "detailed-business-projection",
        "future-growth-per-share",
        "price-forecast",
    ];

    return (
        <aside className="hidden lg:block relative">
            <div className="sticky -mt-16 top-10">
                <h2 className={`heading2 pb-4`}>Analysis</h2>
                <StatsPanel stockAnalysis={stockAnalysis}/>
                <Scrollspy items={items} currentClassName="bg-lime-100 text-navy-100 rounded">
                    <li className="px-4 py-2"><a href="#overview">Overview</a></li>
                    <li className="px-4 py-2"><a href="#business-summary">Business Summary</a></li>
                    <li className="px-4 py-2"><a href="#detailed-business-projection">Business Projection</a></li>
                    <li className="px-4 py-2"><a href="#future-growth-per-share">Future Growth per Share</a></li>
                    <li className="px-4 py-2"><a href="#price-forecast">Price Forecast</a></li>
                </Scrollspy>
            </div>
        </aside>
    );
}