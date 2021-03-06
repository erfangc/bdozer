import {useAuth0} from "@auth0/auth0-react"
import {useRouter} from 'next/router'
import React from 'react'
import {AlreadyResearching} from "../components/Pages/Home/AlreadyResearching"
import {Footer} from "../components/Pages/Home/Footer"
import {Hero} from "../components/Pages/Home/Hero"
import {KnowBeforeYouInvest} from "../components/Pages/Home/KnowBeforeYouInvest"
import {OurUndervaluedPicks} from "../components/Pages/Home/OurUnderValuedPicks"
import {ValueIsWhatYouGet} from "../components/Pages/Home/ValueIsWhatYouGet"
import {Nav} from "../components/Nav";

function Home() {

    const router = useRouter();
    const {isAuthenticated} = useAuth0();

    if (isAuthenticated && localStorage.getItem('redirectUri')) {
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
