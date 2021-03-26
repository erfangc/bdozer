import { useState } from "react";
import { useMarketing } from "../api-hooks";
import { UnsecuredApp } from "../components/App";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";

export default function EarlyAccessPage() {
    const marketing = useMarketing()
    const [email, setEmail] = useState<string>()

    async function submit(email: string) {
        await marketing.earlyAccessRequests({ email })
        setEmail(email)
    }

    return (
        <UnsecuredApp>
            {
                !email
                    ? <Request onSubmit={email => submit(email)} />
                    : <Confirm email={email} />
            }
        </UnsecuredApp>
    )
}

function Request(props: { onSubmit: (email: string) => void }) {
    const [email, setEmail] = useState<string>()

    function submit() {
        props.onSubmit(email)
    }

    return (
        <main className="flex-col flex flex-grow min-h-screen items-center justify-center text-blueGray-200">
            <section className="w-full px-4 xl:px-0 xl:w-2/5">
                <h1 className="text-2xl lg:text-6xl font-extrabold mb-8 w-full">Request Early Access</h1>
                <p className="text-blueGray-300 mb-8">
                    Tired of sifting through hundreds of ratios and stock charts only to feel more confused?<br />
                    Come and use the next generation stock analysis tool. We aggregate the data, build the valuation model to save you time and headache
                </p>
                <ul className="space-y-3 mb-10">
                    <li className="flex space-x-4 items-center">
                        <Check />
                        <p>View stock value analysis preloaded with analyst sales estimates</p>
                    </li>
                    <li className="flex space-x-4 items-center">
                        <Check />
                        <p>Try your own assumptions and see their impact on stock prices</p>
                    </li>
                    <li className="flex space-x-4 items-center">
                        <Check />
                        <p>Export the full model to Excel</p>
                    </li>
                    <li className="flex space-x-4 items-center">
                        <Check />
                        <p>Size your trade based on expected return</p>
                    </li>
                    <li className="flex space-x-4 items-center">
                        <Check />
                        <p>Free for early joiners</p>
                    </li>
                </ul>
                <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-1 lg:space-y-0">
                    <TextInput
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="lg:w-96"
                        value={email}
                        onChange={({ currentTarget: { value } }) => setEmail(value)}
                    />
                    <PrimaryButton onClick={submit}>
                        Sign Up
                    </PrimaryButton>
                </div>
            </section>
        </main>
    )
}

function Confirm(props: { email: string }) {
    return (
        <main className="flex-col flex flex-grow min-h-screen items-center justify-center text-blueGray-200">
            <section className="w-full px-4 xl:px-0 xl:w-2/5">
                <h1 className="text-2xl lg:text-6xl font-extrabold mb-8 w-full">Request Submitted</h1>
                <p className="text-blueGray-300 mb-8">
                    Thank you for your interest, we will keep you posted via <b>{props.email}</b>
                </p>
            </section>
        </main>
    )
}

function Check() {
    return (
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 5.18L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78L22 5.18ZM19.79 10.22C19.92 10.79 20 11.39 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C13.58 4 15.04 4.46 16.28 5.25L17.72 3.81C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.81 21.78 9.67 21.4 8.61L19.79 10.22Z" fill="#16A34A" />
            </svg>
        </div>
    )
}