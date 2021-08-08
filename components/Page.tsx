import Head from "next/head";
import {ServerErrors} from "./ServerErrors/ServerErrors";
import {Notifications} from "./Notifications/Notifications";
import React from "react";

export function Page({children}) {
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