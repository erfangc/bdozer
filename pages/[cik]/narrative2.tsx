import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useModelBuilderFactoryApi } from "../../api-hooks";
import { ModelResult } from "../../client";
import { App } from "../../components/App";
import { Narrative2 } from "../../components/Mvp/Narrative2/Narrative2";

function Component() {
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

    return result && !loading ? <Narrative2 result={result} /> : null
}

export default function Page() {
    return <App><Component /></App>
}