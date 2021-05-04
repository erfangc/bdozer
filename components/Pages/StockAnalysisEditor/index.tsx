import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useFilingEntityManagerUnsecured, useStockAnalysis} from '../../../api-hooks'
import {FilingEntity, StockAnalysis2} from '../../../client'
import {Title} from '../../Common/Title'
import {FilingEntityCard} from '../../FilingEntityCard'
import Toolbar from './Toolbar/Toolbar'
import Editor from './Editor'

export function StockAnalysisControlPanel() {

    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()
    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const stockAnalysisApi = useStockAnalysis()

    const {id} = router.query

    async function saveStockAnalysis(stockAnalysis: StockAnalysis2) {
        await stockAnalysisApi.saveStockAnalysis(stockAnalysis)
        setStockAnalysis(stockAnalysis)
    }

    async function init() {
        try {
            setLoading(true)
            const {data: stockAnalysis} = await stockAnalysisApi.getStockAnalysis(id as string)
            const cik = stockAnalysis.cik ?? stockAnalysis.model.cik;
            if (cik) {
                const {data: filingEntity} = await filingEntityManagerUnsecured.getFilingEntity(cik)
                setFilingEntity(filingEntity);
            }
            setStockAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    useEffect(() => {
        if (id) {
            init()
        }
    }, [id])

    return (
        <main className="container mx-auto px-4 py-20 space-y-12">
            <Title>Stock Analysis Editor</Title>
            <FilingEntityCard loading={loading} filingEntity={filingEntity}/>
            <section className="space-y-6">
                <Toolbar
                    loading={loading}
                    stockAnalysis={stockAnalysis}
                    setStockAnalysis={saveStockAnalysis}
                    setLoading={setLoading}
                />
                <Editor
                    loading={loading}
                    stockAnalysis={stockAnalysis}
                    setStockAnalysis={saveStockAnalysis}
                />
            </section>
        </main>
    )
}
