import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {useStockAnalysis} from "../../../api-hooks";
import {StockAnalysis2} from "../../../client";
import {Title} from "../../Common/Title";
import {TableOutput} from "../StockAnalysesMain/TableOutput";


export function StockAnalysesFullOutput() {
    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysis()
    const { id } = router.query

    const [result, setResult] = useState<StockAnalysis2>()
    const [loading, setLoading] = useState(false)

    async function refreshModel() {
        setLoading(true)
        const resp = await stockAnalysisCrud.getStockAnalysis(id as string)
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
                    : <TableOutput stockAnalysis={result} />
            }
        </main>
    )
}