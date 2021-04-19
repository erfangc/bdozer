import {Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import "tailwindcss/tailwind.css";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  let origin = null
  if (typeof window !== 'undefined') {
    origin = window.location.origin
  }
  return (
    <Auth0Provider
      domain="ease-wealth.us.auth0.com"
      clientId="UbQVqsIomMhckPO1UHXc8OUf5dJxz5yR"
      redirectUri={origin}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
