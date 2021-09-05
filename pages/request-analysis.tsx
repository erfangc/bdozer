import {Nav} from "../components/Nav";
import React, {useState} from "react";
import {PrimaryButton} from "../components/Common/PrimaryButton";
import {useAuth0} from "@auth0/auth0-react";
import {useRouter} from "next/router";
import {useStockAnalysisRequest} from "../api-hooks";

export default function RequestAnalysis() {

    const stockAnalysisRequest = useStockAnalysisRequest();
    const {isAuthenticated, user} = useAuth0();
    const router = useRouter();
    const [ticker, setTicker] = useState('');
    const [email, setEmail] = useState('');

    function handleTickerChange({currentTarget: {value}}: React.ChangeEvent<HTMLInputElement>) {
        setTicker(value);
    }

    function handleEmailChange({currentTarget: {value}}: React.ChangeEvent<HTMLInputElement>) {
        setEmail(value);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        await stockAnalysisRequest.saveStockAnalysisRequest(ticker, isAuthenticated ? user.email : email);
        router.push('/request-analysis-confirmation');
    }

    return (
        <main className="antialiased relative min-h-screen bg-lightGreen-100">
            <Nav/>
            <div className="container mx-auto text-chili-75 mt-24">
                <h2 className="heading3 mb-8">Tell us which stock you want to analyze</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <label>
                        <div className="label-small">Ticker</div>
                        <input
                            className="px-4 py-2 rounded w-48"
                            type="text"
                            value={ticker}
                            onChange={handleTickerChange}
                            placeholder="ex: IBM"
                            name="ticker"
                        />
                    </label>
                    {
                        !isAuthenticated ?
                            <label>
                                <div className="label-small">Your Email</div>
                                <input
                                    className="px-4 py-2 rounded w-72"
                                    name="email"
                                    type="email"
                                    onChange={handleEmailChange}
                                    value={email}
                                    placeholder="ex: yourname@gmail.com"
                                />
                            </label>
                            : null
                    }
                    <PrimaryButton type="submit" className="w-48">Submit</PrimaryButton>
                </form>
            </div>
        </main>
    );
}