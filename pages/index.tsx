import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { LegalDisclaimer } from '../components/LegalDisclaimer'
import { Logo } from '../components/Nav/Logo'
import { PrimaryButton } from '../components/Common/PrimaryButton'
import { SecondaryButton } from '../components/Common/SecondaryButton'

function Home() {

  const router = useRouter()

  function seeSampleReport() {
    router.push(`/published-stock-analyses/0c04b9cb-ddec-4c6e-9445-099bde6c86ca/narrative2`)
  }

  function browse() {
    router.push(`/browse`)
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
                Take the guessing out of buying stocks. Discover what a stock <span className="border-b-2 border-rose-500 italic leading-snug font-semibold">should be</span> worth in <span className="text-orange-400 font-extrabold">under 3 minutes</span> with easy-to-follow step-by-step explanations.
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
            <div className="hidden xl:w-2/3 lg:w-1/2 lg:flex lg:justify-center mt-16">
              <img src="stocks.svg" alt="" />
            </div>
          </div>
        </div>
        <LegalDisclaimer className="px-4 lg:px-0 mt-32" />
      </div>
    </main >
  )
}

export default Home
