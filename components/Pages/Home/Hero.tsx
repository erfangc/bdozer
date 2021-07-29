import React from 'react';
import {Search, StockSearch} from '../../Common2/Search';

export function Hero() {
    return (
        <section className="bg-lightGreen-100 text-chili-100 flex lg:flex-row">
            <div className="space-y-12 py-20 lg:p-32">
                <h1 className="text-center heading1 lg:text-left lg:display">Better investments <br/> in less time</h1>
                <h4 className="hidden lg:block heading4">Discover what stocks are <span
                    className="heading5">actually</span> worth in
                    under <br/> 3 minutes with step-by-step explanations
                </h4>
                <h4 className="lg:hidden text-center paragraph-regular">Discover what stocks are <span
                    className="heading5">actually</span> worth in
                    under 3 minutes with step-by-step explanations
                </h4>
                <div className="px-4 lg:px-0">
                    <StockSearch/>
                </div>
            </div>
            <img className="hidden lg:block" src="./hero-image.svg" alt="..."/>
        </section>
    );
}