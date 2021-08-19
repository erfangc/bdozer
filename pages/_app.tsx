import {Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import "tailwindcss/tailwind.css";
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
    // this block is needed b/c the page may render on the server where window is not defined
    let origin = null
    if (typeof window !== 'undefined') {
        origin = window.location.origin
    }
    return (
         <Auth0Provider
            domain="bdozer.us.auth0.com"
            clientId="JL3lqp6KSxPpqWJFZLY620Vn8M1FWfkR"
            redirectUri={origin}
            audience="https://bdozer-api.herokuapp.com"
            scope="view:watchlist edit:watchlist"
            useRefreshTokens
        >
            <Component {...pageProps} />
        </Auth0Provider>
    )
}

export default MyApp
