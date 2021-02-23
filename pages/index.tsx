import Head from 'next/head'
import React from 'react'
import { ModelEditor } from '../components/ModelEditor/ModelEditor'
import { ServerErrors } from '../components/ServerErrors/ServerErrors'

export default function Home() {
  return (
    <div className="bg-blueGray-900 min-h-screen antialiased">
      <Head>
        <title>Equity Model Builder - UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServerErrors />
      <ModelEditor />
    </div>
  )
}
