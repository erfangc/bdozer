import { useRouter } from 'next/router'
import React from 'react'
import { App } from '../components/App'

export default function Home() {
  const router = useRouter()
  return (
    <App>
      <div className="container mx-auto h-screen flex items-center ml-24">
        <div>
          <h1 className="text-5xl text-blueGray-50 font-bold">Welcome.</h1>
          <p className="mt-2 mb-12 text-sm text-blueGray-50 w-1/2">
            This model building tool is intended to help you create complex DCF models using
            economic driver based assumptions. You can test different capital market assumptions, model drivers and
            view their impact on the target price of the company's stock
        </p>
          <button
            onClick={() => router.push('/model-builder/sample')}
            className={`bg-blue-600 text-blueGray-50 rounded py-2 px-4 transition ease-linear hover:bg-blue-700 focus:outline-none`}
          >
            See a sample model for Dropbox (DBX)
        </button>
        </div>
      </div>
    </App>
  )
}
