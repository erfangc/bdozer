import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useStockAnalyzerFactory } from '../api-hooks'
import { StockAnalysis } from '../client'
import { UnsecuredApp } from '../components/App'
import { StockAnalysisSearch } from '../components/Mvp/StockAnalysisSearch'

export default function Home() {
  const router = useRouter()
  const stockAnalyzer = useStockAnalyzerFactory()
  const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis[]>([])

  useEffect(() => {
    stockAnalyzer
      .getAnalyses()
      .then(({ data }) => setStockAnalyses(data))
  }, [])

  function navigate(cik: string) {
    router.push(`/${cik}/narrative2`)
  }

  return (
    <UnsecuredApp>
      <main className="min-h-screen mx-auto px-2 w-full max-w-lg">
        <StockAnalysisSearch onSubmit={({ cik }) => navigate(cik)} className="mb-20 mt-16" />
        <div className="mb-8">
          <h1 className="border-b inline pb-4 border-blueGray-700"><span className="bg-fuchsia-700 px-2 py-1 rounded font-extrabold uppercase">New</span> Stock Analyses</h1>
        </div>
        <div className="flex flex-col space-y-4 mb-8">
          {
            stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis} />)
          }
        </div>
      </main>
    </UnsecuredApp>
  )
}

function StockAnalysisCard(props: { stockAnalysis: StockAnalysis }) {
  const router = useRouter()

  const { stockAnalysis } = props
  const { currentPrice, targetPrice, model, model: { symbol, name, cik } } = stockAnalysis
  const percentUpside = (targetPrice / currentPrice - 1) * 100

  function navigate(cik: string) {
    router.push(`/${cik}/narrative2`)
  }

  return (
    <div
      key={cik}
      className="bg-blueGray-700 px-6 py-6 rounded-md shadow-md flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear"
      onClick={() => navigate(stockAnalysis['_id'])}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-lg text-blueGray-200 tracking-wide">{name}</span>
          <span className="text-4xl text-blueGray-200 font-bold">{symbol}</span>
        </div>
        <span className="flex space-x-4">
          <div>
            <div className="uppercase text-sm text-blueGray-300">Target Price</div>
            <div className="font-extrabold">${targetPrice.toFixed(1)}</div>
          </div>
          <div>
            <div className="uppercase text-sm text-blueGray-300">{percentUpside > 0 ? 'Upside' : 'Downside'}</div>
            <div className={`font-extrabold ${percentUpside > 0 ? 'text-lime-500' : 'text-red-500'}`}>{percentUpside.toFixed(1)}%</div>
          </div>
        </span>
      </div>
    </div>
  )
}