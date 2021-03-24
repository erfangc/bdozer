import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStockAnalyzerFactory } from "../../api-hooks";
import { StockAnalysis } from "../../client";
import { UnsecuredApp } from "../../components/App";
import { Narrative2 } from "../../components/Mvp/Narrative2/Narrative2";

function NarrativeComponent() {
    const router = useRouter()
    const api = useStockAnalyzerFactory()
    const { cik } = router.query

    const [result, setResult] = useState<StockAnalysis>()
    const [loading, setLoading] = useState(false)

    async function refreshModel(cik: string) {
        if (cik) {
            setLoading(true)
            const { data } = await api.getAnalysis(cik)
            setResult(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshModel(cik as string)
    }, [cik])

    return result && !loading ? <Narrative2 result={result} /> : null
}

export default function NarativePage() {
    return (
        <UnsecuredApp>
            <NarrativeComponent />
        </UnsecuredApp>
    )
}