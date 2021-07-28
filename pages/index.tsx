import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Home() {

    const router = useRouter()
    const auth0 = useAuth0()

    if (auth0.isAuthenticated && localStorage.getItem('redirectUri')) {
        router.push(localStorage.getItem('redirectUri'))
        localStorage.removeItem('redirectUri')
        return null
    }

    return (
        <main className="antialiased">
            <Nav />
            <Hero />
            <OurUndervaluedPicks />
            <KnowBeforeYouInvest />
            <AlreadyResearching />
            <ValueIsWhatYouGet />
            <Footer />
        </main>
    )
}

function AlreadyResearching() {
    return (
        <section className="bg-lime-75 py-16 flex flex-col items-center space-y-6 text-center">
            <h3 className="heading3">Already Reasearching? See an Analysis.</h3>
            <p className="paragraph-regular">
                Search a company to see our analysis and determine<br />
                whether or not to invest.
            </p>
            <div className="w-1/3">
                <Search />
            </div>
        </section>
    );
}

function KnowBeforeYouInvest() {
    return (
        <section className="py-16 flex flex-col items-center text-center text-chili-100">
            <h1 className="heading1 ">Know before you invest</h1>
            <p className="paragraph-emphasis mt-4">
                Don’t just take someone’s word for it. We show you <br /> every step of the way how we determine our forecast <br /> with easy to understand explanations.
            </p>
            <ul className="mt-16 flex space-x-16">
                <li className="flex flex-col space-y-6">
                    <img src="./Valuation.svg" alt="" className="h-32" />
                    <h4 className="heading4">Real Valuation</h4>
                    <p className="paragraph-regular">
                        Find out what a stock is <br /> actually worth, using our <br /> expert analysis.
                    </p>
                </li>
                <li className="flex flex-col space-y-6">
                    <img src="./Business_Breakdown.svg" alt="" className="h-32" />
                    <h4 className="heading4">Business Breakdown</h4>
                    <p className="paragraph-regular">
                        Understand how a <br /> company makes and <br /> spends its money.
                    </p>
                </li>
                <li className="flex flex-col space-y-6">
                    <img src="./Future_Earnings.svg" alt="" className="h-32" />
                    <h4 className="heading4">Future Earnings per Share</h4>
                    <p className="paragraph-regular">
                        See how much a share can <br /> make in the furture.
                    </p>
                </li>
                <li className="flex flex-col space-y-6">
                    <img src="./Forecast.svg" alt="" className="h-32" />
                    <h4 className="heading4">10 Year Forecast</h4>
                    <p className="paragraph-regular">
                        Know the future forecast of <br /> a company’s valuation <br /> based on expert analysis
                    </p>
                </li>
            </ul>
            <div className="mt-20">
                <SecondaryButton width={24}>Register for Free and See for Yourself</SecondaryButton>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="bg-chili-100 text-white">
            <div className="container flex justify-center py-16">
                <Logo />
                <div className="ml-20 w-1/2">
                    <h5 className="label-small">LEGAL DISCLAIMER</h5>
                    <p className="label-micro">
                        The information contained on this website and the resources available for download through this website is not intended as, and shall not be understood or construed as, financial advice. The information contained on this website is not a substitute for financial advice from a professional who is aware of the facts and circumstances of your individual situation We have done our best to ensure that the information provided on this website and the resources available for download are accurate and provide valuable information. We expressly recommend that you conduct your own due diligence and analysis or seek advice from a professional
                    </p>
                </div>
            </div>
        </footer>
    )
}

function ValueIsWhatYouGet() {
    return (
        <section className="flex w-2/3 mx-auto py-16">
            <div className="space-y-6 w-1/2">
                <h3 className="heading3">Price is what you pay. <br /> Value is what you get.</h3>
                <p className="paragraph-regular">
                    When investing, the hardest work should be deciding which wonderful companies are most worth your money. Once that decision is made, time is your best friend while interference is the enemy. Experts make these long-term decisions through value investing; the measurement of financial and economic factors to determine a stock’s intrinsic value. Using  then assess whether a stock is over or under valued at its current price.
                    The end goal is to arrive at a number that an investor can compare with a security's current price in order to see whether the security is undervalued or overvalued.
                </p>
                <SecondaryButton width={20}>
                    Sign Up and See For Yourself
                </SecondaryButton>
            </div>
            <div className="flex-grow pl-32">
                <img src="./stock-image.png" alt="..." className="w-full" />
            </div>
        </section>
    );
}

function SecondaryButton({ children, width, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { width?: number }) {

    const [hovering, setHovering] = useState(false);

    const childrenAsStr = children.toString()

    function hoverTrue() {
        setHovering(true);
    }

    function hoverFalse() {
        setHovering(false);
    }

    return (
        <button className={`relative h-12`} style={{ width: `${width}rem` }} {...props} onMouseEnter={hoverTrue} onMouseLeave={hoverFalse}>
            <span className={`absolute text-white flex items-center inset-0 bg-lime-100 rounded-full shadow-md h-12 ${hovering ? 'w-full' : 'w-12'} transition-all ease-linear`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-12 h-12"><path d="M0 0h24v24H0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
            </span>
            <span className={`absolute inset-0 pl-14 flex items-center`}>
                {children}
            </span>
        </button>
    )
}

function OurUndervaluedPicks() {
    return (
        <section className="bg-dashboardGray-100 px-32 py-16 flex flex-col justify-center items-center">
            <h3 className="heading3 text-white">Our Undervalued Picks</h3>
            {/* Card */}
            <div className="flex space-x-5 mt-8">
                <StockAnalysisCard />
                <StockAnalysisCard />
                <StockAnalysisCard />
                <StockAnalysisCard />
            </div>
        </section>
    );
}

function StockAnalysisCard() {
    return (
        <div className="bg-navy-100 rounded-lg px-5 py-4 space-y-2 w-72">
            <div className="flex items-center space-x-2">
                <span className="text-lime-100 heading5">TGT</span>
                <span className="label-small text-lightGreen-25">Target Corp</span>
            </div>
            <div>
                <div className="flex space-x-8">
                    <div>
                        <label className="label-micro text-lightGreen-25">Fair Value</label>
                        <p className="numbers-bold text-lightGreen-25">$162.20</p>
                    </div>
                    <div>
                        <label className="label-micro text-lightGreen-25">Current Price</label>
                        <p className="numbers-bold text-lightGreen-25">$100.20</p>
                    </div>
                </div>
                <hr className="border-navy-75" />
            </div>
            <p className="text-lime-100">
                +95.8% Upside
            </p>
        </div>
    );
}

function Hero() {
    return (
        <section className="bg-lightGreen-100 text-chili-100 flex">
            <div className="space-y-12 p-32">
                <h1 className="display">Better investments <br /> in less time</h1>
                <h4 className="heading4">Discover what stocks are <span className="heading5">actually</span> worth in under <br /> 3 minutes with step-by-step explanations</h4>
                <Search />
            </div>
            <img src="./hero-image.svg" alt="..." />
        </section>
    );
}

function Search() {
    return (
        <div className="h-16  border-chili-100 rounded flex items-center bg-white w-full">
            <input type="text" className="pl-4 h-full border-0 rounded flex-grow" placeholder="Search a stock to analyse for free ..." />
            <button className="bg-lime-100 h-10 px-6 mr-4 rounded">Search</button>
        </div>
    )
}

function Nav() {
    return (
        <nav className="bg-chili-100 h-24 text-white items-center flex justify-between sticky">
            <Logo />
            <div className="space-x-4 pr-12">
                <PrimaryButton>Register Today</PrimaryButton>
                <button className="text-lime-100">Log In</button>
            </div>
        </nav>
    )
}

function PrimaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`bg-lime-100 rounded-3xl paragraph-medium text-chili-100 shadow-md px-6 py-2 hover:bg-avocado-75 hover:text-lightGreen-25 ${className}`}>
            {children}
        </button>
    )
}

function Logo() {
    return (
        <div className="font-bold pl-12 flex items-center space-x-2">
            <img className="h-4 w-4 bg-lime-100 border-0"></img>
            <span style={{ fontSize: '26px' }} className="font-bold">BDozer</span>
        </div>
    )
}

export default Home
