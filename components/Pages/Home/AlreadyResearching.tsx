import React from 'react'
import {StockSearch} from '../../Common2/Search';


export function AlreadyResearching() {
    return (
        <section className="bg-lime-75 px-8 lg:px-0 py-16 flex flex-col items-center space-y-6 text-center">
            <h3 className="heading3">Already Researching? See an Analysis.</h3>
            <p className="hidden lg:block paragraph-regular">
                Search a company to see our analysis and determine<br/>
                whether or not to invest.
            </p>
            <p className="lg:hidden paragraph-regular">
                Search a company to see our analysis and determine
                whether or not to invest.
            </p>
            <div className="w-full lg:w-1/3">
                <StockSearch/>
            </div>
        </section>
    );
}
