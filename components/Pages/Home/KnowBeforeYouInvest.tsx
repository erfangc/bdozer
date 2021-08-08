import React from 'react';
import {SecondaryButton} from '../../Common/SecondaryButton';
import {useAuth0} from "@auth0/auth0-react";

export function KnowBeforeYouInvest() {
    const {loginWithRedirect} = useAuth0();
    function signup() {
        loginWithRedirect({screen_hint: 'signup'});
    }
    return (
        <section className="py-16 px-8 lg:px-0 flex flex-col items-center text-center text-chili-100">
            <h1 className="lg:heading1 heading2">Know before you invest</h1>
            <p className="hidden lg:block paragraph-emphasis mt-4">
                Don’t just take someone’s word for it. We show you <br/> every step of the way how we determine our
                forecast <br/> with easy to understand explanations.
            </p>
            <p className="lg:hidden paragraph-emphasis mt-4">
                Don’t just take someone’s word for it. We show you every step of the way how we determine our forecast
                with easy to understand explanations.
            </p>
            <ul className="mt-16 flex flex-col space-y-6 lg:space-x-16 lg:space-y-0 lg:flex-row">
                <li className="flex flex-col space-y-6">
                    <img src="./Valuation.svg" alt="" className="h-32"/>
                    <h4 className="heading4">Real Valuation</h4>
                    <p className="paragraph-regular">
                        Find out what a stock is <br/> actually worth, using our <br/> expert analysis.
                    </p>
                </li>
                <li className="flex flex-col space-y-6">
                    <img src="./Business_Breakdown.svg" alt="" className="h-32"/>
                    <h4 className="heading4">Business Breakdown</h4>
                    <p className="paragraph-regular">
                        Understand how a <br/> company makes and <br/> spends its money.
                    </p>
                </li>
                <li className="flex flex-col space-y-6">
                    <img src="./Future_Earnings.svg" alt="" className="h-32"/>
                    <h4 className="heading4">Future Earnings per Share</h4>
                    <p className="paragraph-regular">
                        See how much a share can <br/> make in the furture.
                    </p>
                </li>
                <li className="flex flex-col space-y-6">
                    <img src="./Forecast.svg" alt="" className="h-32"/>
                    <h4 className="heading4">10 Year Forecast</h4>
                    <p className="paragraph-regular">
                        Know the future forecast of <br/> a company’s valuation <br/> based on expert analysis
                    </p>
                </li>
            </ul>
            <div className="mt-20">
                <SecondaryButton width={23} onClick={signup}>Register for Free and See for Yourself</SecondaryButton>
            </div>
        </section>
    )
}