import React from 'react'
import { StockSearch} from '../../Common2/Search';


export function AlreadyResearching() {
    return (
        <section className="bg-lime-75 py-16 flex flex-col items-center space-y-6 text-center">
            <h3 className="heading3">Already Reasearching? See an Analysis.</h3>
            <p className="paragraph-regular">
                Search a company to see our analysis and determine<br />
                whether or not to invest.
            </p>
            <div className="w-1/3">
                <StockSearch />
            </div>
        </section>
    );
}
