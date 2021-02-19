import Head from 'next/head'
import { ModelEditor } from '../components/ModelEditor/ModelEditor';

export default function Home() {
  return (
    <div className="bg-blueGray-900 min-h-screen antialiased">
      <Head>
        <title>Equity Model Builder - UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ModelEditor />

    </div>
  )
}
