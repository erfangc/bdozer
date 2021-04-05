import { useAuth0 } from "@auth0/auth0-react";
import Head from "next/head";
import React from "react";
import { Hamburger } from "./Nav/Hamburger";
import { Nav } from "./Nav/Nav";
import { ServerErrors } from "./ServerErrors/ServerErrors";

export function App({ children }) {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    if (isLoading) {
        return null
    } else if (!isAuthenticated) {
        loginWithRedirect()
        return null
    } else {
        return (
            <>
                <Head>
                    <title>Bulldozer | Home</title>
                    <link rel="icon" href="/favicon.ico" />
                    <script type="text/javascript" src="/fullstory.js"></script>
                </Head>
                <div className="bg-blueGray-900 min-h-screen antialiased">
                    <Nav />
                    <Hamburger />
                    <ServerErrors />
                    <div className="lg:ml-20 flex text-blueGray-50 bg-blueGray-900">
                        {children}
                    </div>
                </div>
            </>
        )
    }
}

export function UnsecuredApp({ children }) {
    return (
        <>
            <Head>
                <title>Bulldozer | Home</title>
                <link rel="icon" href="/favicon.ico" />
                <script type="text/javascript" src="/fullstory.js"></script>
            </Head>
            <div className="bg-blueGray-900 text-blueGray-50 min-h-screen antialiased">
                <Nav />
                <Hamburger />
                <ServerErrors />
                <div className="lg:ml-20">
                    {children}
                </div>
            </div>
        </>
    )
}