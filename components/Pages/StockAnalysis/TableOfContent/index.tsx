import React from 'react';
import {StockAnalysis2} from "../../../../client";
import Scrollspy from "react-scrollspy";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TableOfContent(props: Props) {

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
                <h2 className="heading2 pb-4">Analysis</h2>
                <Scrollspy items={items} currentClassName="bg-lime-100 text-navy-100 rounded">
                    <li className="p-2"><a href="#overview">Overview</a></li>
                    <li className="p-2"><a href="#business-summary">Business Summary</a></li>
                    <li className="p-2"><a href="#detailed-business-projection">Business Projection</a></li>
                    <li className="p-2"><a href="#future-growth-per-share">Future Growth per Share</a></li>
                    <li className="p-2"><a href="#price-forecast">Price Forecast</a></li>
                </Scrollspy>
            </div>
        </aside>
    );
}