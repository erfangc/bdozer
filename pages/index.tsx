import {useAuth0} from "@auth0/auth0-react"
import {useRouter} from 'next/router'
import React from 'react'
import {AlreadyResearching} from "../components/Pages/Home/AlreadyResearching"
import {Footer} from "../components/Pages/Home/Footer"
import {Hero} from "../components/Pages/Home/Hero"
import {KnowBeforeYouInvest} from "../components/Pages/Home/KnowBeforeYouInvest"
import {Nav} from "../components/Pages/Home/Nav"
import {OurUndervaluedPicks} from "../components/Pages/Home/OurUnderValuedPicks"
import {ValueIsWhatYouGet} from "../components/Pages/Home/ValueIsWhatYouGet"

function Home() {

    const router = useRouter()
    const auth0 = useAuth0()

    if (auth0.isAuthenticated && localStorage.getItem('redirectUri')) {
        router.push(localStorage.getItem('redirectUri'))
        localStorage.removeItem('redirectUri')
        return null
    }

    return (
        <main className="antialiased relative">
            <Nav/>
            <Hero/>
            <OurUndervaluedPicks/>
            <KnowBeforeYouInvest/>
            <AlreadyResearching/>
            <ValueIsWhatYouGet/>
            <Footer/>
        </main>
    )
}

export default Home
