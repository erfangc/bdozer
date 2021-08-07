import React from 'react';
import {StockAnalysis2} from "../../../../client";
import Scrollspy from "react-scrollspy";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TableOfContent(props: Props) {

    const items = [
        "summary",
        "return-forecast",
        "business-breakdown",
        "future-growth-per-share",
        "price-forecast",
    ];

    return (
        <aside className="hidden lg:block relative">
            <div className="sticky -mt-16 top-10">
                <h2 className="heading2 pb-4">Analysis</h2>
                <Scrollspy items={items} currentClassName="bg-lime-100 text-navy-100 rounded">
                    <li className="p-2"><a href="#summary">Summary</a></li>
                    <li className="p-2"><a href="#return-forecast">Return Forecast</a></li>
                    <li className="p-2"><a href="#business-breakdown">Business Breakdown</a></li>
                    <li className="p-2"><a href="#future-growth-per-share">Future Growth per Share</a></li>
                    <li className="p-2"><a href="#price-forecast">Price Forecast</a></li>
                </Scrollspy>
            </div>
        </aside>
    );
}