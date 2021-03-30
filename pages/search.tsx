import { useRouter } from 'next/router'
import React from 'react'
import { basePath } from '../api-hooks'
import { StockAnalysis, StockAnalyzerFactoryControllerApi } from '../client'
import { UnsecuredApp } from '../components/App'
import { LegalDisclaimer } from '../components/LegalDisclaimer'
import { StockAnalysisSearch } from '../components/Mvp/StockAnalysisSearch'
interface Props {
    stockAnalyses: StockAnalysis[]
}
function Home(props: Props) {
    const router = useRouter()

    const { stockAnalyses } = props

    function navigate(cik: string) {
        router.push(`/${cik}/narrative2`)
    }

    return (
        <UnsecuredApp>
            <main className="min-h-screen mx-auto container px-2 flex flex-col justify-between">
                <section>
                    <StockAnalysisSearch onSubmit={({ cik }) => navigate(cik)} className="mb-20 mt-16" />
                    <div className="mb-8">
                        <h1 className="border-b pb-4 border-blueGray-700">
                            <span><span className="bg-fuchsia-600 px-2 py-1 rounded font-extrabold uppercase">featured</span> Stock Analyses</span>
                        </h1>
                        <span className="block mt-8 ml-2 text-sm text-blueGray-300">Click to see detail</span>
                    </div>
                    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                        {
                            stockAnalyses.map(stockAnalysis => <StockAnalysisCard stockAnalysis={stockAnalysis} />)
                        }
                    </div>
                </section>
                <LegalDisclaimer />
            </main>
        </UnsecuredApp>
    )
}

Home.getInitialProps = async () => {
    const stockAnalyzer = new StockAnalyzerFactoryControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getAnalyses()
    return { stockAnalyses: data }
}

export default Home

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
                    <span className="text-lg text-blueGray-200">{name}</span>
                    <span className="text-4xl text-blueGray-200 font-bold tracking-tight">{symbol}</span>
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

function LoadingSkeletons() {
    return <>
        {[1, 2, 3].map(i => (
            <div
                key={i}
                className="bg-blueGray-700 px-6 py-6 rounded-md shadow-md flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear"
            >
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <span className="w-48 h-8 bg-blueGray-500 rounded-md animate-pulse"></span>
                        <span className="w-24 h-8 bg-blueGray-500 rounded-md animate-pulse"></span>
                    </div>
                    <span className="flex space-x-4">
                        <div className="w-20 h-12 bg-blueGray-500 rounded-md animate-pulse">
                        </div>
                        <div className="w-20 h-12 bg-blueGray-500 rounded-md animate-pulse">
                        </div>
                    </span>
                </div>
            </div>
        ))}
    </>
}