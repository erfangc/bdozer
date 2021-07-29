import React from 'react';
import {Search, StockSearch} from '../../Common2/Search';

export function Hero() {
    return (
        <section className="bg-lightGreen-100 px-8 lg:px-0 text-chili-100 flex lg:px-0 lg:flex-row lg:justify-center">
            <div className="space-y-12 py-20 lg:p-32">
                <h1 className="hidden lg:block display">Better investments <br/> in less time</h1>
                <h1 className="lg:hidden text-center heading1">Better investments in less time</h1>
                <h4 className="hidden lg:block heading4">Discover what stocks are <span
                    className="heading5">actually</span> worth in
                    under <br/> 3 minutes with step-by-step explanations
                </h4>
                <h4 className="lg:hidden text-center paragraph-regular">Discover what stocks are <span
                    className="heading5">actually</span> worth in
                    under 3 minutes with step-by-step explanations
                </h4>
                <StockSearch/>
            </div>
            <img className="hidden lg:block" src="./hero-image.svg" alt="..."/>
        </section>
    );
}