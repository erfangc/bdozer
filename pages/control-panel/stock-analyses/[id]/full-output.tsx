import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { StockAnalysis2 } from '../../../../client'
import { App } from '../../../../components/App'
import { FullOutputDisplay } from '../../../../components/Pages/ControlPanel/FullModelDisplay'
import { Title } from '../../../../components/Common/Title'
import { useStockAnalysisCrud } from '../../../../api-hooks'

function FullModelComponent() {
    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const { id } = router.query

    const [result, setResult] = useState<StockAnalysis2>()
    const [loading, setLoading] = useState(false)

    async function refreshModel() {
        setLoading(true)
        const resp = await stockAnalysisCrud.get(id as string)
        setResult(resp.data)
        setLoading(false)
    }

    useEffect(() => {
        if (id) {
            refreshModel()
        }
    }, [id])

    return (
        <main className="flex flex-grow flex-col items-center justify-center">
            <Title className="mt-4 mb-8">Model {loading ? ' Loading ... ' : null}</Title>
            {
                loading || result === undefined
                    ? null
                    : <FullOutputDisplay stockAnalysis={result} />
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