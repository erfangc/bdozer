import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useStockAnalyzerFactory } from '../../../api-hooks'
import { StockAnalysis } from '../../../client'
import { App } from '../../../components/App'
import { FullModelDisplay as StockAnalysisDisplay } from '../../../components/Pages/FullModelDisplay'
import { Title } from '../../../components/Title'

function FullModelComponent() {
    const router = useRouter()
    const api = useStockAnalyzerFactory()
    const { cik } = router.query

    const [result, setResult] = useState<StockAnalysis>()
    const [loading, setLoading] = useState(false)

    async function refreshModel(cik: string) {
        setLoading(true)
        const { data } = await api.getAnalysis(cik)
        setResult(data)
        setLoading(false)
    }

    useEffect(() => {
        refreshModel(cik as string)
    }, [cik])

    return (
        <main className="flex flex-grow flex-col items-center justify-center">
            <Title className="mt-4 mb-8">Model {loading ? ' Loading ... ' : null}</Title>
            {
                loading || result === undefined
                    ? null
                    : <StockAnalysisDisplay result={result} />
            }
        </main>
    )
}

export default function FullModelPage() {
    return (
        <App>
            <FullModelComponent />
        </App>
    )
}