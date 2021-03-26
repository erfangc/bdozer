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
      <main className="min-h-screen mx-auto pt-12 px-2 w-full max-w-lg">
        <StockAnalysisSearch onSubmit={({ cik }) => navigate(cik)} className="mb-12" />
        <div className="text-blueGray-50">
          <h1 className="border-b mb-8 pb-2 border-blueGray-500"><span className="bg-rose-600 p-1 rounded-lg font-bold">New</span> Stock Analysis</h1>
        </div>
        {
          stockAnalyses.map(stockAnalysis => {
            const { currentPrice, targetPrice, model, model: { symbol, name, cik } } = stockAnalysis
            const percentUpside = (targetPrice / currentPrice - 1) * 100
            return (
              <div
                key={cik}
                className="text-blueGray-50 bg-blueGray-700 px-4 py-6 rounded-md shadow-md flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear"
                onClick={() => navigate(stockAnalysis['_id'])}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{symbol}</span>
                    <span className="text-lg text-blueGray-300">{name}</span>
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
          })
        }
      </main>
    </UnsecuredApp>
  )
}
