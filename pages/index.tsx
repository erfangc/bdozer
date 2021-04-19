import Head from 'next/head'
import {useRouter} from 'next/router'
import React from 'react'
import {LegalDisclaimer} from '../components/LegalDisclaimer'
import {Logo} from '../components/Nav/Logo'
import {PrimaryButton} from '../components/Common/PrimaryButton'
import {SecondaryButton} from '../components/Common/SecondaryButton'
import {useAuth0} from "@auth0/auth0-react";

function Home() {

    const router = useRouter()
    const auth0 = useAuth0()

    function seeSampleReport() {
        router.push(`/published-stock-analyses/0c04b9cb-ddec-4c6e-9445-099bde6c86ca/narrative2`)
    }

    function browse() {
        router.push(`/browse`)
    }

    if (auth0.isAuthenticated && localStorage.getItem('redirectUri')) {
        router.push(localStorage.getItem('redirectUri'))
        localStorage.removeItem('redirectUri')
        return null
    }

    return (
        <main className="bg-blueGray-900 min-h-screen antialiased text-blueGray-50">
            <Head>
                <title>Bulldozer | Home</title>
                <link rel="icon" href="/favicon.ico" />
                <script type="text/javascript" src="/fullstops.js" />
            </Head>
            <div className="flex flex-col justify-between min-h-screen lg:container lg:mx-auto">
                <div>
                    <div className="flex space-x-2 items-end px-2 pt-4 lg:mt-10">
                        <Logo className="inline" />
                        <div className="text-blueGray-300 font-extrabold text-xl">bdzoer</div>
                    </div>
                    <div className="lg:flex">
                        {/* tag line + subtext */}
                        <div className="px-4 mt-14 space-y-16 flex flex-col lg:w-1/2 xl:w-1/3 lg:space-y-8 lg:mt-24">
                            <h1 className="text-4xl font-bold tracking-tighter">Save Time <br />Finding Your Next Trade
                            </h1>
                            <p className="leading-relaxed">
                                Take the guessing out of buying stocks.
                                Discover what stocks
                                <span className="border-b-2 pb-0.5 border-rose-500 leading-snug font-extrabold"> should be</span> worth
                                in <span className="text-orange-400 font-extrabold"> under 3 minutes</span> with step-by-step explanations
                            </p>
                            <div className="flex flex-col space-y-4 lg:w-64">
                                <PrimaryButton onClick={seeSampleReport}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                                    </svg>
                                    <span className="pl-2">See a Sample Report</span>
                                </PrimaryButton>
                                <SecondaryButton onClick={browse} className="text-blueGray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span className="pl-2">Browse All Research</span>
                                </SecondaryButton>
                            </div>
                        </div>
                        {/* end tag line */}
                        <div className="hidden xl:w-2/3 lg:w-1/2 lg:flex lg:justify-center">
                            <Diamond />
                        </div>
                    </div>
                </div>
                <LegalDisclaimer className="px-4 lg:px-0 mt-32" />
            </div>
        </main>
    )
}

function Diamond() {
    return (
        <svg
            width="636"
            height="636"
            viewBox="0 0 636 636"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition ease-out duration-700 transform hover:-rotate-12 hover:scale-105"
        >
            <g clipPath="url(#clip0)">
                <path d="M441.38 266.492L257.706 525.701L587.23 308.832L441.38 266.492Z" fill="#FBBF24" />
                <path d="M234.175 68.4617L95.5287 166.094L241.379 208.433L234.175 68.4617Z" fill="#FBBF24" />
                <path d="M441.38 266.492L587.23 308.832L522.414 152.135L441.38 266.492Z" fill="#FEF08A" />
                <path d="M441.38 266.492L378.294 110.299L241.379 208.433L441.38 266.492Z" fill="#FBBF24" />
                <path d="M378.294 110.299L234.175 68.4617L241.379 208.433L378.294 110.299Z" fill="#F59E0B" />
                <path d="M522.414 152.135L378.294 110.298L441.38 266.492L522.414 152.135Z" fill="#FBBF24" />
                <path d="M241.379 208.433L257.706 525.701L441.38 266.492L241.379 208.433Z" fill="#F59E0B" />
                <path d="M95.5287 166.094L257.706 525.701L241.379 208.433L95.5287 166.094Z" fill="#D97706" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect
                        width="512"
                        height="512"
                        fill="white"
                        transform="translate(143.518 0.780701) rotate(16.1876)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

export default Home
