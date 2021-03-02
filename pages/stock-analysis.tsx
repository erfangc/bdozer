import HighchartsReact from "highcharts-react-official"

import React, { ReactNode, useState } from "react"
import { RegisterEmailControllerApi } from "../client"
import { blueGray, highcharts } from "../HighchartsConfig"

function VehicleDeliveryChart() {
    const options: Highcharts.Options = {
        title: {
            text: 'Projected EV Sales',
            style: {
                color: blueGray,
                fontSize: '1.5rem'
            }
        },
        yAxis: {
            title: {
                text: 'Vehicle Sales in Millions',
                style: {
                    color: blueGray,
                    fontSize: '1rem'
                }
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: blueGray,
                    fontSize: '0.78ren'
                },
            },
        },
        legend: {
            enabled: false
        },
        series: [
            {
                name: 'Deliveries',
                type: 'column',
                groupPadding: 0,
                data: [
                    {
                        x: 2022,
                        y: 1.2,
                        color: '#3730A3',
                    },
                    {
                        x: 2023,
                        y: 1.5,
                        color: '#4F46E5'
                    },
                    {
                        x: 2024,
                        y: 2.2,
                        color: '#6366F1'
                    },
                    {
                        x: 2025,
                        y: 3.8,
                        color: '#A5B4FC'
                    },
                ]
            }
        ]
    }
    return (
        <HighchartsReact
            highcharts={highcharts}
            options={options}
        />
    )
}

function Source({ href }) {
    return (
        <a className="underline hover:no-underline cursor-pointer text-xs align-bottom ml-1" href={href} target="_blank">(source)</a>
    )
}

function Button({ className, children, ...props }: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    return (
        <a
            className={`px-6 py-4 bg-gradient-to-r from-orange-400 to-amber-500 rounded text-xl text-blueGray-900 ${className} flex items-center space-x-4 hover:to-orange-500 hover:from-amber-500 cursor-pointer`}
            {...props}
        >
            {children}
        </a>
    )
}

function Exit() {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.6667 35H8.33333C6.49238 35 5 33.5076 5 31.6667V25H8.33333V31.6667H31.6667V8.33333H8.33333V15H5V8.33333C5 6.49238 6.49238 5 8.33333 5H31.6667C33.5076 5 35 6.49238 35 8.33333V31.6667C35 33.5076 33.5076 35 31.6667 35ZM18.3333 26.6667V21.6667H5V18.3333H18.3333V13.3333L26.6667 20L18.3333 26.6667Z" fill="#334155" />
        </svg>
    )
}

function Question({ children }: { children: ReactNode }) {
    return (
        <h1>
            <pre className="font-mono text-2xl font-extrabold lg:text-xl mb-3 shadow p-2 rounded-md w-48 bg-blueGray-50 flex justify-between">
                Question
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM11 17V19H13V17H11ZM12 7C13.1046 7 14 7.89543 14 9C14.0035 9.53073 13.7904 10.0399 13.41 10.41L12.17 11.67C11.4214 12.4217 11.0008 13.4391 11 14.5V15H13C12.9223 13.925 13.3559 12.8763 14.17 12.17L15.07 11.25C15.6681 10.6543 16.003 9.84411 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9H10C10 7.89543 10.8954 7 12 7Z" fill="#334155" />
                </svg>
            </pre>
            <span className="text-3xl lg:text-4xl">
                {children}
            </span>
        </h1>
    )
}

export default function StockAnalysis() {
    return (
        <main className="text-blueGray-800">

            <section className="min-h-screen flex items-center bg-blueGray-800 main-bg">
                <div className="container mx-auto h-3/4 flex-col flex space-y-10 justify-center px-4">
                    <p className="text-blue-400 uppercase font-semibold">
                        Tesla Corp (TSLA)
                    </p>
                    <h1 className="text-6xl text-blueGray-50">
                        Tesla is worth <code className="font-mono text-blue-500 font-bold">$592</code> according to our analysis
                    </h1>
                    <Button className="lg:w-80" href="#question1"><span>Learn more</span><Exit /></Button>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center mx-auto container" id="question1">
                <div className="flex-col flex space-y-10 px-4">
                    <Question>
                        <span className="text-3xl lg:text-4xl">
                            In 2020, Tesla had 50% market share in the electrical vehicle market
                            <br />
                            Do you think this statement is true?
                        </span>
                    </Question>
                    <div className="flex-col flex space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                        <Button href="#answer1" className="md:w-56">Yes</Button>
                        <Button href="#answer1" className="md:w-56">No</Button>
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center mx-auto container justify-center" id="answer1">
                <div className="flex items-center flex-col space-y-10">
                    <div className="flex items-center flex-col space-y-4">
                        <p className="uppercase text-blue-600 font-bold">Our Answer</p>
                        <h1 className="text-6xl text-blue-900 font-extrabold font-mono">16%</h1>
                        <p
                            className="text-2xl text-blue-900 font-extrabold w-96 text-center"
                        >
                            Tesla, as the leader in Electric Vehicles, has 16% market share
                        </p>
                    </div>
                    <ul className="flex-col flex space-y-10 lg:space-y-0 lg:space-x-6 lg:flex-row">
                        <li className="w-48 text-center text-blue-600 font-semibold bg-blue-100 p-4 rounded-lg">In 2020, Tesla sold 500,000 cars globally <Source href="https://insideevs.com/news/485298/global-plugin-car-sales-december-2020/" /></li>
                        <li className="w-48 text-center text-blue-600 font-semibold bg-blue-100 p-4 rounded-lg">20% of Tesla's sales came from Energy Storage and Vehicle Services <Source href="https://tesla-cdn.thron.com/static/1LRLZK_2020_Q4_Quarterly_Update_Deck_-_Searchable_LVA2GL.pdf?xseo=&response-content-disposition=inline%3Bfilename%3D%22TSLA-Q4-2020-Update.pdf%22" /></li>
                    </ul>
                    <Button href="#question2">Continue</Button>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center mx-auto container" id="question2">
                <div className="flex-col flex space-y-10 px-4">
                    <Question>
                        <span className="text-3xl lg:text-4xl">
                            By 2025, 1 in 15 new passenger cars sold will be Tesla
                            <br />
                            Do you agree?
                        </span>
                    </Question>
                    <div className="flex-col flex space-y-2">
                        <Button href="#answer2" className="lg:w-2/5">Yes, that sounds about right</Button>
                        <Button href="#answer2" className="lg:w-2/5">No, I think they will sell more</Button>
                        <Button href="#answer2" className="lg:w-2/5">No, I think they will sell less</Button>
                        <Button href="#answer2" className="lg:w-2/5">Not sure, tell me more</Button>
                    </div>
                </div>
            </section>
            {/*  */}
            <section className="min-h-screen flex items-center bg-blueGray-800" id="answer2">
                <div className="flex items-center mx-auto container p-4 h-full md:p-2 text-blueGray-50 lg:px-0">
                    {/* left */}
                    <div className="lg:w-1/2 xl:w-2/5 lg:mr-4 hidden lg:block">
                        <VehicleDeliveryChart />
                    </div>
                    {/* right */}
                    <div className="flex flex-col space-y-10">
                        <h5 className="text-2xl text-amber-500 font-semibold">
                            In our fair value calculation, <br />
                            our analyst project that 1 in 15 <br />
                            new passenger cars sold world wide will be Tesla by 2025
                        </h5>
                        <ul className="flex flex-col space-y-4 font-light">
                            <li>Tesla expects to produce and sell 3.8 million cars by 2025 <Source href="https://www.marketwatch.com/story/tesla-stock-sinks-7-after-quarterly-profit-is-a-miss-11611782700" /></li>
                            <li>Demand is strong: the global electric vehicles grew rapidly for the past 5 years 43% per year <Source href="https://insideevs.com/news/485298/global-plugin-car-sales-december-2020/" /></li>
                            <li>Policy makers in US, Europe and China are putting more emphasis on green energy electrical vehicles <Source href="https://www2.deloitte.com/us/en/insights/focus/future-of-mobility/electric-vehicle-trends-2030.html" /></li>
                        </ul>
                        <div className="w-48">
                            <Button href="#question3">Continue</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center mx-auto container" id="question3">
                <div className="flex-col flex space-y-10 px-4">
                    <Question>
                        <span className="text-3xl lg:text-4xl">
                            By 2025, Tesla will be able to reduce cost and double its margin to 26%
                            <br />
                            Do you agree?
                        </span>
                    </Question>
                    <div className="flex-col flex space-y-2">
                        <Button href="#answer3" className="lg:w-2/5">Yes, that sounds about right</Button>
                        <Button href="#answer3" className="lg:w-2/5">No, margins will be higher</Button>
                        <Button href="#answer3" className="lg:w-2/5">No, margins will be lower</Button>
                        <Button href="#answer3" className="lg:w-2/5">Not sure, tell me more</Button>
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center bg-blueGray-800" id="answer3">
                <div className="flex items-center mx-auto container p-4 h-full md:p-2 text-blueGray-50 lg:px-0">
                    <div className="flex flex-col space-y-10">
                        <h5 className="text-2xl text-amber-500 font-semibold">
                            In our fair value calculation, <br />
                            Tesla will be able to reduce cost and double its margin to 26%
                        </h5>
                        <ul className="flex flex-col space-y-4 font-light">
                            <li>Expand Gigafactory in Shanghai <Source href="https://tesla-cdn.thron.com/static/1LRLZK_2020_Q4_Quarterly_Update_Deck_-_Searchable_LVA2GL.pdf?xseo=&response-content-disposition=inline%3Bfilename%3D%22TSLA-Q4-2020-Update.pdf%22
"/></li>
                            <li>Building Gigafactory in Berlin and Texas</li>
                            <li>Selling Software as a Service and Mass Produce Auto Pilot</li>
                        </ul>
                        <div className="w-48">
                            <Button href="#question4">Continue</Button>
                        </div>
                    </div>
                </div>
            </section>


            {/*  */}
            <section className="min-h-screen flex items-center mx-auto container" id="question4">
                <div className="flex-col flex space-y-10 px-4">
                    <Question>
                        <span className="text-3xl lg:text-4xl">
                            By 2025, 50% Tesla car buyers will purchase Tesla self-driving software, which cost $10,000
                            <br />
                            Do you agree?
                        </span>
                    </Question>
                    <div className="flex-col flex space-y-2">
                        <Button href="#answer4" className="lg:w-2/5">Yes, that sounds about right</Button>
                        <Button href="#answer4" className="lg:w-2/5">No, more people will buy</Button>
                        <Button href="#answer4" className="lg:w-2/5">No, less people will buy</Button>
                        <Button href="#answer4" className="lg:w-2/5">Not sure, tell me more</Button>
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center bg-blueGray-800" id="answer4">
                <div className="flex items-center mx-auto container p-4 h-full md:p-2 text-blueGray-50 lg:px-0">
                    <div className="flex flex-col space-y-10">
                        <h5>
                            <span className="font-semibold text-blue-300 uppercase">In our fair value calculation</span>
                            <p className="text-3xl font-extralight mt-4">
                                By 2025 <span className="font-mono text-blue-400">50%</span> Tesla car buyers will purchase Tesla self-driving software
                            </p>
                        </h5>
                        <ul className="flex flex-col space-y-4 font-light">
                        </ul>
                        <div className="w-48">
                            <Button href="#end">Continue</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="min-h-screen flex items-center mx-auto container p-4 justify-center" id='end'>
                <div className="flex items-center flex-col h-full justify-center space-y-10">
                    <div className="flex items-center flex-col space-y-4">
                        <p className="uppercase text-blue-600 font-bold">Our Target Price</p>
                        <h1 className="text-6xl text-blue-900 font-extrabold font-mono">$592</h1>
                        <p
                            className="text-2xl text-blue-900 font-extrabold w-96 text-center"
                        >
                            To Review, We Based our Valuation On:
                        </p>
                    </div>
                    <ul className="flex-col flex space-y-10 lg:space-y-0 lg:space-x-6 lg:flex-row">
                        <li className="w-48 text-center text-blue-600 font-semibold bg-blue-100 p-4 rounded-lg">1 in 15 new passenger car sold world wide will be Tesla</li>
                        <li className="w-48 text-center text-blue-600 font-semibold bg-blue-100 p-4 rounded-lg">Tesla would be able to cut cost and double its margin to 26%</li>
                        <li className="w-48 text-center text-blue-600 font-semibold bg-blue-100 p-4 rounded-lg">50% of Tesla customers will buy their self-driving software</li>
                    </ul>
                    <div className="flex-col space-y-2">
                        <div className="w-96 flex flex-col space-y-2">
                            <Button href="#info">See the Full Model</Button>
                        </div>
                        <div className="w-96 flex flex-col space-y-2">
                            <Button href="#info">Request Another Stock Analysis</Button>
                        </div>
                        <div className="w-96 flex flex-col space-y-2">
                            <Button href="#info">Request Early Access</Button>
                            <p className="text-sm px-6">Over 10,000 Stock Analyses Constantly Updated by Professionals</p>
                        </div>
                    </div>
                </div>
            </section>
            <Info />
        </main>
    )
}

function Info() {
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState<string | undefined>("No extraneous marketing emails, only updates on stock analyses and early access acceptance notification")
    const [submitted, setSubmitted] = useState(false)

    async function submit() {
        if (!email) {
            setMessage("Email is required")
        } else {
            try {
                const api = new RegisterEmailControllerApi()
                await api.register(email)
                setSubmitted(true)
            } catch (e) {
                setMessage('Sorry, an error has occured')
            }
        }
    }

    return (
        <section className="min-h-screen flex items-center mx-auto container p-4 justify-center flex-col space-y-4" id='info'>
            {!submitted
                ?
                <>
                    <div className="flex flex-col space-y-2 lg:w-1/2 w-full">
                        <label>Enter Your Email Address</label>
                        <input
                            type="email"
                            className="px-6 py-4 text-lg border-2 rounded-lg border-blueGray-600 outline-none focus:outline-none focus:border-blue-800 transition-all ease-linear"
                            onChange={({ currentTarget: { value } }) => setEmail(value)}
                        />
                        <p>{message}</p>
                    </div>
                    <Button onClick={submit}>Request Early Access</Button>
                </>
                : <h1>Your information has been submitted. Thank you</h1>}
        </section>
    )
}