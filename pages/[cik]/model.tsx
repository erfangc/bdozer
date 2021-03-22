import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useModelBuilderFactoryApi } from '../../apiHooks'
import { EvaluateModelResult } from '../../client'
import { App } from '../../components/App'
import { ModelResult } from '../../components/Experimental/ModelDisplay'
import { Title } from '../../components/Title'

function ModelComponent() {
    const router = useRouter()
    const api = useModelBuilderFactoryApi()
    const { cik } = router.query

    const [result, setResult] = useState<EvaluateModelResult>()
    const [loading, setLoading] = useState(false)

    async function refreshModel(cik: string) {
        setLoading(true)
        const { data } = await api.model(cik)
        setResult(data)
        setLoading(false)
    }

    useEffect(() => {
        refreshModel(cik as string)
    }, [cik])

    return (
        <main className="text-blueGray-50 flex flex-grow flex-col items-center justify-center">
            <Title className="mt-4 mb-8">Model {loading ? ' Loading ... ' : null}</Title>
            {
                loading || result === undefined
                    ? null
                    : <ModelResult result={result} />
            }
        </main>
    )
}

export default function ModelPage() {
    return (
        <App>
            <ModelComponent />
        </App>
    )
}