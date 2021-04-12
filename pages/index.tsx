import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { LegalDisclaimer } from '../components/LegalDisclaimer'
import { Logo } from '../components/Nav/Logo'
import { PrimaryButton } from '../components/Common/PrimaryButton'
import { SecondaryButton } from '../components/Common/SecondaryButton'
import { useAuth0 } from "@auth0/auth0-react";

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
        <script type="text/javascript" src="/fullstory.js"></script>
      </Head>
      <div className="flex flex-col justify-between min-h-screen lg:container lg:mx-auto">
        <div>
          <div className="flex space-x-2 items-end px-2 pt-4 lg:mt-10">
            <Logo className="inline" /> <div className="text-blueGray-300 font-extrabold text-xl">bdzoer</div>
          </div>
          <div className="lg:flex">
            {/* tag line + subtext */}
            <div className="px-4 mt-14 space-y-16 flex flex-col lg:w-1/2 xl:w-1/3 lg:space-y-8 lg:mt-24">
              <h1 className="text-4xl font-bold tracking-tighter">Save Time <br />Finding Your Next Trade</h1>
              <p className="leading-relaxed">
                Take the guessing out of buying stocks.
                Discover what stocks
                <span className="border-b-2 border-rose-500 italic leading-snug font-semibold"> should be</span> worth in
                <span className="text-orange-400 font-extrabold"> under 3 minutes</span> with step-by-step explanations
            </p>
              <div className="flex flex-col space-y-4 lg:w-64">
                <PrimaryButton onClick={seeSampleReport}>
                  See a Sample Report
                </PrimaryButton>
                <SecondaryButton onClick={browse} className="py-2 border border-blueGray-500 text-blueGray-300 text-left">
                  Browse our Research
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
    </main >
  )
}

function Diamond() {
  return (
    <svg width="636" height="636" viewBox="0 0 636 636" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition ease-linear transform hover:-rotate-3">
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
          <rect width="512" height="512" fill="white" transform="translate(143.518 0.780701) rotate(16.1876)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Home
