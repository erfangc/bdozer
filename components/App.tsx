import {useAuth0} from "@auth0/auth0-react";
import Head from "next/head";
import React from "react";
import {Notifications} from "./Notifications/Notifications";
import {ServerErrors} from "./ServerErrors/ServerErrors";

export function App({children}) {

    const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();
    const redirectUri = 'redirectUri';

    if (isLoading) {
        return null
    } else {
        if (!isAuthenticated) {
            localStorage.setItem(redirectUri, window.location.href)
            loginWithRedirect()
            return null
        } else {
            return (
                <>
                    <Head>
                        <title>Bulldozer | Home</title>
                        <link rel="icon" href="/favicon.ico"/>
                        <script type="text/javascript" src="/fullstory.js"></script>
                    </Head>
                    <ServerErrors/>
                    <Notifications/>
                    {children}
                </>
            )
        }
    }
}

export function UnsecuredApp({children}) {
    return (
        <>
            <Head>
                <title>Bulldozer | Home</title>
                <link rel="icon" href="/favicon.ico"/>
                <script type="text/javascript" src="/fullstory.js"></script>
            </Head>
            <ServerErrors/>
            <Notifications/>
            {children}
        </>
    )
}