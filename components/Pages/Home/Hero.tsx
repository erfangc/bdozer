import React from 'react';
import {Search, StockSearch} from '../../Common2/Search';

export function Hero() {
    return (
        <section className="bg-lightGreen-100 text-chili-100 flex">
            <div className="space-y-12 p-32">
                <h1 className="display">Better investments <br/> in less time</h1>
                <h4 className="heading4">Discover what stocks are <span className="heading5">actually</span> worth in
                    under <br/> 3 minutes with step-by-step explanations</h4>
                <StockSearch/>
            </div>
            <img src="./hero-image.svg" alt="..."/>
        </section>
    );
}