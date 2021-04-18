import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useStockAnalysis } from '../../../../api-hooks'
import { StockAnalysis2 } from '../../../../client'
import { App } from '../../../../components/App'
import { Narrative2 } from '../../../../components/Pages/Narrative2/Narrative2'

function PreviewComponent() {
    const stockAnalysisCrud = useStockAnalysis()
    const { id } = useRouter().query
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()

    async function init() {
        const { data: stockAnalysis } = await stockAnalysisCrud.getStockAnalysis(id as string)
        setStockAnalysis(stockAnalysis)
    }

    useEffect(() => {
        if (id) {
            init()
        }
    }, [id])

    return !stockAnalysis ? null : <Narrative2 stockAnalysis={stockAnalysis} />
}


export default function Preview() {
    return (
        <App>
            <PreviewComponent />
        </App>
    )
}
