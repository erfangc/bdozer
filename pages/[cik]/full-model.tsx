import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useModelBuilderFactoryApi } from '../../api-hooks'
import { ModelResult } from '../../client'
import { App } from '../../components/App'
import { FullModelDisplay as ModelResultDisplay } from '../../components/Mvp/FullModelDisplay'
import { Title } from '../../components/Title'

function FullModelComponent() {
    const router = useRouter()
    const api = useModelBuilderFactoryApi()
    const { cik } = router.query

    const [result, setResult] = useState<ModelResult>()
    const [loading, setLoading] = useState(false)

    async function refreshModel(cik: string) {
        setLoading(true)
        const { data } = await api.createModel(cik)
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
                    : <ModelResultDisplay result={result} />
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