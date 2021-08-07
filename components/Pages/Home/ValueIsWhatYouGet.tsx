import React from 'react';
import {SecondaryButton} from '../../Common2/SecondaryButton';

export function ValueIsWhatYouGet() {
    return (
        <section className="flex flex-col px-8 lg:px-0 lg:flex-row lg:w-2/3 px-8 lg:px-0 mx-auto py-16">
            <div className="space-y-6 lg:w-1/2">
                <h3 className="heading3">Price is what you pay.</h3>
                <h3 className="heading3">Value is what you get.</h3>
                <p className="paragraph-regular">
                    When investing, the hardest work should be deciding which wonderful companies are most worth your
                    money. Once that decision is made, time is your best friend while interference is the enemy. Experts
                    make these long-term decisions through value investing; the measurement of financial and economic
                    factors to determine a stock’s intrinsic value. Using then assess whether a stock is over or under
                    valued at its current price.
                    The end goal is to arrive at a number that an investor can compare with a security's current price
                    in order to see whether the security is undervalued or overvalued.
                </p>
                <SecondaryButton width={20}>
                    Sign Up and See For Yourself
                </SecondaryButton>
            </div>
            <div className="flex-grow pl-32 hidden lg:block">
                <img src="./stock-image.png" alt="..." className="w-full"/>
            </div>
        </section>
    );
}
