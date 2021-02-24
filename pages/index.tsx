import { Auth0Provider } from '@auth0/auth0-react'
import Head from 'next/head'
import React from 'react'
import { App } from '../components/App'

export default function Home() {
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
      <Head>
        <title>Equity Model Builder - UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </Auth0Provider>
  )
}
